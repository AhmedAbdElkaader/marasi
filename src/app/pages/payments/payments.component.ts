import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { NgForm } from '@angular/forms';
import { Payments } from './payments.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  public unpaids: any;
  public paids: any;
  public isChecked: any;
  public obj: any;
  _id = 0;
  public user: any;
  public merged: any;
  public paid: any;

  constructor(private restService: RestService, private spinner: NgxSpinnerService) {}


  ngOnInit() {
    this.unpaidRentals();
    this.paidRentals();
  }

  unpaidRentals() {
    this.restService.getUnpaidRentals().subscribe((response : any)=>{
      this.unpaids = response.data;
    });
  }

  paidRentals() {
  this.restService.getpaidRentals().subscribe((response : any)=>{
    this.paids = response.data;
  });
}

  putIntoField(id) {
    this._id = id
    this.obj = {
      id,
      paid: true
    }
    this.merged = Object.assign(this.obj)
		this.restService.updateRentalPayments(this.merged)
			.subscribe((response: any) => {
        this.user = response
        this.unpaidRentals();
        this.paidRentals();
  })
    
  }
}