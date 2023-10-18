import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'all-reports',
  templateUrl: './all-reports.component.html',
  styleUrls: ['./all-reports.component.scss']
})
export class AllReportsComponent implements OnInit {

  selectedItemBeach = "0"
  selectedItemVila = "0"
  mainGats = []
  beaches
  villages
  selectedOptionMainGate
  selectedOptionbeachGate
  selectedOptionVailgGate
  id
  option = '0';
  showControl = false;
  showtable = false
  showButtons = false
  showSearcForUnit = false
  form: FormGroup;
  ownersSearchResult
  dontSearchChars = [' ', '-']
  queryField: FormControl = new FormControl('');
  ownername = ''
  option2 = '0'
  unitId
  showControlSingleUnit = false
  showDate = false
  unitName

  settings = {
    columns: {
      id: {
        title: 'ID'
      },
      card_id: {
        title: 'card_id'
      },
      card_type: {
        title: 'card_type'
      },
      input_type: {
        title: 'input_type'
      },
      controller_id: {
        title: 'controller_id'
      },
      direction: {
        title: 'direction'
      },
      status_message: {
        title: 'status_message'
      },
      time_stamp: {
        title: ' time_stamp'
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,

    },
  };

  ReportsArr = []


  //1/06/2019

  constructor(private rest: RestService) {
  }

  ngOnInit() {
    this.queryField.valueChanges
      .subscribe((queryFieldValue: string) => {
        if (queryFieldValue != "") {
          this.rest.getUnitByname(queryFieldValue)
            .subscribe((response: any) => {
              this.ownersSearchResult = response
              console.log(this.ownersSearchResult)
            })
        }else{
          this.ownersSearchResult = []
        }
      })
    this.form = new FormGroup({
      currentStartDate: new FormControl(new Date()),
      currentEndDate: new FormControl(new Date()),
    })

    this.rest.getAllGats().subscribe((res: any) => {
      console.log(res)
      this.mainGats = res.main_gates
      for (let i = 0; i < this.mainGats.length; i++) {
        this.mainGats[i].value = i
      }
      this.beaches = res.beach_gates
      this.villages = res.village_gates
    })
  }


  selectGate(i, id) {
    this.id = id
    this.selectedOptionMainGate = i + ''
    this.showButtons = true
    this.selectedOptionbeachGate = '100'
    this.selectedOptionVailgGate = '100'
    this.showtable = false

  }
  selectBeach(i, id) {
    this.id = id
    this.selectedOptionbeachGate = i + ''
    this.showButtons = true
    this.selectedOptionVailgGate = '100'
    this.selectedOptionMainGate = '100'
    this.showtable = false

  }
  selectVilage(i, id) {
    this.id = id
    this.selectedOptionVailgGate = i + ''
    this.showButtons = true
    this.selectedOptionbeachGate = '100'
    this.selectedOptionMainGate = '100'
    this.showtable = false

  }

  getAllUnits() {
    this.showControl = true
    this.showControlSingleUnit = false
    this.showSearcForUnit = false
    this.showDate = true
    this.showtable = false
    this.unitName = ''
  }

  getSingleUnit() {
    this.showSearcForUnit = true
    this.showControl = false
    this.showDate = false
    this.showtable = false
    this.unitName = ''
    this.showControlSingleUnit = false

  }

  getReport() {
    
    let myForm = this.form.value
    let obj = {
      unitID : this.unitId,
      input_type: this.option,
      input_type2: this.option2,
      id: this.id,
      startDate: myForm.currentStartDate,
      endDate: myForm.currentEndDate
    }

    if(this.showControl == true){
      if (this.option == '0') {
        this.rest.getReports(obj).subscribe((res: any) => {
          this.showtable = true
          this.ReportsArr = res.data
          console.log(res)
        })
      } else {
        this.rest.getReportByCase(obj).subscribe((res: any) => {
          this.showtable = true
          this.ReportsArr = res.data
          console.log(res)
        })
      }

    }else{
      if(this.option2 == '0'){
        this.rest.getReportSingleUnitAll(obj).subscribe((res :any) => {
          this.showtable = true
          this.ReportsArr = res.data
          console.log(res)
        })
      }else if(this.option2 == '1') {
        this.rest.getReportSingleUnitOwners(obj).subscribe((res :any) => {
          this.showtable = true
          this.ReportsArr = res.data
          console.log(res)
        })
      }else if(this.option2 == '2') {
        this.rest.getReportSingleUnitGust(obj).subscribe((res :any) => {
          this.showtable = true
          this.ReportsArr = res.data
          console.log(res)
        })
      }else if(this.option2 == '3') {
        this.rest.getReportSingleUnithouseHold(obj).subscribe((res :any) => {
          this.showtable = true
          this.ReportsArr = res.data
          console.log(res)
        })
      }
    }

    console.log(obj)
  }

  putIntoField(id,unitName) {
    this.unitId = id
    this.showControlSingleUnit = true
    this.showDate = true
    this.ownersSearchResult = []
    this.unitName = unitName
  }




}

