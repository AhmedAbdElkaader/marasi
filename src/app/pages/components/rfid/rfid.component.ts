import { Component, OnInit ,ViewChild,Input, ElementRef} from '@angular/core';
import { RestService } from '../../../services/rest.service';

@Component({
  selector: 'rfid',
  templateUrl: './rfid.component.html',
  styleUrls: ['./rfid.component.scss']
})
export class RFIDComponent implements OnInit {

  @Input() unitId = 0;
  @Input() resultRfId:string;

  @ViewChild('inputRf') inputRf: ElementRef;

  rfIdInput;
  






  somethingChanged(event){
    let str = event.srcElement.value
    if (str.charCodeAt(str.length - 1) == 10) {
      let tArr = str.split(String.fromCharCode(10))
      let index = tArr.length - 2
      console.log(tArr)

      let arr = tArr[index].match(/.{2}/g)
      arr.pop()
      arr.pop()
      arr.shift()
      arr.shift()
      tArr[index] = arr.reverse().join('')
      
      var unique = tArr.filter(function(item, index){
        return tArr.indexOf(item) >= index;
      });

      event.srcElement.value = unique.join(String.fromCharCode(10))
      // console.log(arr.reverse().join(event.srcElement.value))
      // tArr.forEach(element => {
      //   if (element == "") return
      //   let arr = element.match(/.{2}/g)
      //   console.log(arr.reverse().join(''))
      // });
      this.rfIdInput =  event.srcElement.value
      console.log(this.rfIdInput)
    }
 }
 
 
 
 save(){
  this.rest.saveUnitRfid(this.unitId,this.rfIdInput).subscribe(() =>{
    console.log("done")
    // this.inputRf.nativeElement.value = ""

  })
}



 
  constructor(private rest :RestService ) { }

  ngOnInit() {

    
  }

  ngOnChanges($event) {
    if ($event.resultRfId && $event.resultRfId.currentValue){
      this.inputRf.nativeElement.value = $event.resultRfId.currentValue

    }
  }

}
