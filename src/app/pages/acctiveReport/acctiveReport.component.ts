import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf'
import 'jspdf-autotable';
import { count } from 'rxjs/operators';


@Component({
  selector: 'report',
  templateUrl: './acctiveReport.component.html',
  styleUrls: ['./acctiveReport.component.scss']
})
export class ReportComponent implements OnInit {


  reportData: any
  show: boolean = false

  allUnitsNumber;
  allUnitsArr;
  activedOwnerNumber;
  activedOwnerArr;
  activedGuestNumber;
  activedGusetArr;
  activedExtraGuestNumber;
  activedExtraGusetArr;
  activedHouseHoldNumber;
  activedHouseHoldArr;
  constructor(private rest: RestService) { }

  ngOnInit() {
  }
  
  getData() {
    this.rest.generateReport().subscribe((data) => {
      this.reportData = data
      this.allUnitsNumber = this.reportData.all_units.number
      this.allUnitsArr = this.reportData.all_units.units

      this.activedOwnerNumber = this.reportData.activated_owners.number
      this.activedOwnerArr = this.reportData.activated_owners.activated_owners_list

      this.activedGuestNumber = this.reportData.activated_guests.number
      this.activedGusetArr = this.reportData.activated_guests.activated_guest_list

      this.activedExtraGuestNumber = this.reportData.activated_extra_guest.number
      this.activedExtraGusetArr = this.reportData.activated_extra_guest.activated_extra_guest

      this.activedHouseHoldNumber = this.reportData.activated_household.number
      this.activedHouseHoldArr = this.reportData.activated_household.activated_household

      this.show = true
    })
  }
 
  row =[]

  public getpdf(name) {
    var col = ["Unit Name"];
    let _this = this
    let data

    if(name == 'pdfOwnerCard'){
      data = this.activedOwnerArr
      col.push("Owners Count")
    }else if(name == "pdfGust"){
      data = this.activedGusetArr
      col.push("Guest Count")
    }else if(name == "pdfExtra"){
      col.push("Extra Guest Count")
      data = this.activedExtraGusetArr
    }else if(name == "pdfHouseHold"){
      col.push("Household Count")
      data = this.activedHouseHoldArr
    }else if(name == "pdfUnit"){
      data = this.allUnitsArr
    }
    var doc = new jsPDF();
    var rows=[]
    var result = data.map(function(e){
      let test = typeof(e) == 'string' ? `${e}` : Object.values(e)
      if  (typeof(e) == 'string') {
        let tmpArr = []
        tmpArr.push(test)
        rows.push(tmpArr)
      } else {
        rows.push(test)

      }
      console.log(test)
    })
    
    doc.autoTable({
      head:[col],
      body:rows,
    })



    doc.save('Test.pdf');

  }

} 
