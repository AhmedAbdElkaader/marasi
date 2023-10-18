import { Component, ViewChildren, ViewChild } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { StatusCardComponent } from '../components/status-card/status-card.component';
import { SocketService } from '../../services/socket-service.service';
import { DatePipe } from '@angular/common';

interface CardSettings {
	title: string;
	iconClass: string;
	type: string;
	clickable: boolean
}

@Component({
	selector: 'marrasi-units',
	styleUrls: ['./units.component.scss'],
	templateUrl: './units.component.html',
 })


export class UnitsComponent {

    subscription: Subscription;


	@ViewChild('socketCard') socketCard
	@ViewChild('printerCard') printerCard


	loading = false;
	toggleLoadingAnimation() {
		this.loading = true;
		setTimeout(() => this.loading = false, 1000);
	}


	socketCardData: CardSettings = {
		title: 'Socket',
		iconClass: 'nb-lightbulb',
		type: 'primary',
		clickable: false
	};

	printerCardData: CardSettings = {
		title: 'Printer',
		iconClass: 'nb-lightbulb',
		type: 'primary',
		clickable: false
	};

	rfId:any 
	resultRfId:string
	unitDocuments: any [] = []
	ownersSearchResult: any [] = []
	selectedOwnersList: any [] = []
	guestCardsList : any [] = []
	hhList : any [] = []
	rentalsList: any [] = []
	queryField: FormControl = new FormControl('');
	ownername = ''
	dontSearchChars = [' ', '-']
	selectedUnitName = ''
	unitId = 0
	rentalUnitId = 0
	date: any
	date2: any
	public obj: any;
	public merged: any;
	public result: any;
	public dt2: any;
	public dt1: any;
	public price: any;

	constructor(public socketService: SocketService, public rest: RestService, public datePipe: DatePipe) {}

	
	ngOnInit() {
		// this.getVillages();
		let _this = this
		this.queryField.valueChanges
			.subscribe((queryFieldValue: string) => {
				this.unitDocuments = []
				this.ownersSearchResult = []
				this.selectedOwnersList = []
				this.selectedUnitName = ''
				if (queryFieldValue.length < 5 || this.dontSearchChars.includes(queryFieldValue.charAt(queryFieldValue.length - 1))) return
				this.rest.getOwnersByname(queryFieldValue)
					.subscribe((response: any) => {
						this.ownersSearchResult = response
						// console.log(this.ownersSearchResult)
					})
			});

			this.socketService.connectError().subscribe(() => {
				_this.socketCard.on = false
			})
	
			this.socketService.connect().subscribe(() => {
				_this.socketCard.on = true
			})
	
			this.socketService.printerStatus().subscribe((status) => {
				_this.printerCard.on = status
			})

	}

	putIntoField(_unitId) {
		this.ownersSearchResult = []
		this.resultRfId=" "
		this.unitId = _unitId
		let _this = this
		this.rest.getOwnersByUnitId(_unitId)
			.subscribe((response: any) => {
				_this.selectedOwnersList = response
				_this.selectedUnitName = this.selectedOwnersList[0].unitFullName
				_this.unitId = this.selectedOwnersList[0].unit_id
			})
		
		this.rest.getUnitDocuments(_unitId)
			.subscribe((response: any) => {
				_this.unitDocuments = response
			})
		
		this.rest.getGuestCards(_unitId).subscribe((response: any) => {
			_this.guestCardsList = response	
		})

		this.rest.getHHByUnitId(_unitId).subscribe((response: any) => {
			console.log(response)
			_this.hhList = response
		})

		this.rest.getRentalsByUnitId(_unitId).subscribe((response: any) => {
			_this.rentalsList = response
			console.log(response)
		})	

		this.subscription = this.rest.getData().subscribe(data => {
			if(data != ""){
				this.putIntoField(_unitId);
			}
		})	

		this.rest.getRfid(this.unitId).subscribe((data) => {

			_this.rfId = data

			_this.resultRfId =  _this.rfId.join(String.fromCharCode(10))

			 console.log(_this.resultRfId)

			
			
		  })


	}


	selectDate(event){
		this.date = this.datePipe.transform(event, 'yyyy-MM-dd');
	}

	selectDate2(event){
		this.date2 = this.datePipe.transform(event, 'yyyy-MM-dd');
	}

	 diff_weeks(dt2, dt1) {
		var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  		diff /= (60 * 60 * 24 * 7);
  		return Math.abs(Math.round(diff));
	}

	putIntoRentalField(unit_id){

		this.dt1 = new Date(this.date);
		this.dt2 = new Date(this.date2);
		var one_week_price 		=	1000
		var two_weeks_price 	=	2000
		var three_weeks_price	=	3000
		var number 		=	this.diff_weeks(this.dt1, this.dt2)
		var week_one 	=	0
		var week_two	=	0
		var week_three 	=	0
		
		while(number > 0) {
			
			if (number >= 3) {
			number = number - 3
			week_three = week_three + 1
			}

			else if(number == 2) {
			number = number - 2
			week_two	=	week_two + 1
			}

			else if(number == 1) {
			number = number - 1
			week_one 	=	week_one + 1 
			}
		}
		this.price = one_week_price * week_one
		this.price += two_weeks_price * week_two 
		this.price 	+= three_weeks_price * week_three

		let amount = this.price;

		let rent_from: any
		let rent_to: any
		this.rentalUnitId = unit_id
		rent_from = this.date
		rent_to = this.date2
		
		this.obj = {
			unit_id,
			rent_from,
			rent_to,
			amount,
			paid: false
		}
		this.merged = Object.assign(this.obj)
		this.rest.saveRental(this.merged)
			.subscribe((response: any) => {
		this.result = response;
  })
}
	ngAfterViewInit() {

	}
}