axios = require('axios')
MifareHandler = require('./lib/mifare').HandleMifare

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

const util = require('util');
const exec = util.promisify(require('child_process').exec);

var args = process.argv.slice(2);

if (args.length < 2) {
    console.log("invalid arguments")
    return
}

controller_id = args[0]
direction = args[1]


SerialPort.list( (err, port) => {
    if (err) {
        console.log(err)
    }
    
    if (port) {
        console.log(port)
    }
})

console.log(`controller: ${controller_id}, direction: ${direction}`)
const port = new SerialPort(args[2], {
    baudRate: 115200

}, function (err) {
    if (err) {
        return console.log('Error: ', err.message)
    }
    console.log('port opened')
})


const parser = new Readline()
port.pipe(parser)


var api = require('./lib/api')
parser.on('data', async (line) => {
    requestData = {}

    console.log(`> ${line}`)
    line = line.toString()
    input_type = line.substring(3, 2)
    if (line.charCodeAt(5) == 53) {  // mifare card

        try {
            mifareHandler =  new MifareHandler(line, controller_id, direction)
            validationObj = await mifareHandler.validateData()
            console.log(validationObj)
            if (validationObj && validationObj.status_code == 0) gateControl()
        }
        catch {
            gateControl()
        }
        finally {
            return
        }


    } else if (line.charCodeAt(5) == 51) { // QR code
        requestData = {
            "card_id": line.substring(8).replace("\r",""),
            "card_type": 2,
            "input_type": "03",
            "controller_id": controller_id,
            "direction": direction
        }
    } else if (line.charCodeAt(5) == 50) {
        requestData = { // 0800000000000186A1
                        // 0800000000000186A1
            "card_id": `${line.substring(6)}`.replace("\r",""),
            "card_type": 1,
            "input_type": "02",
            "controller_id": controller_id,
            "direction": direction
        }

    } else if (line.charCodeAt(5) == 49) {
        requestData = {
            "card_id": `${line.substring(6)}`.replace("\r",""),
            "card_type": 1,
            "input_type": "01",
            "controller_id": controller_id,
            "direction": direction
        }

    }

    try {
        returnval = await api.postData(`mainGateAccess`, requestData)
        //console.log(returnval.data)
        if (returnval.data.status_code == 0){
		console.log(returnval.data)
		gateControl()
	}
	}
    catch {
        gateControl()
    }
})

// 400501571A00000000000002C62098
// 570000001A00000000000002C62098

async function gateControl() {
    const { stdout, stderr } = await exec('mosquitto_pub -t "/devices/wb-gpio/controls/MOD1_OUT1/on" -m "1"');
    setTimeout(async function() {
        const { stdout, stderr } = await exec('mosquitto_pub -t "/devices/wb-gpio/controls/MOD1_OUT1/on" -m "0"');

    }, 1250)
  }
