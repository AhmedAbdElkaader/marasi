import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../environments/environment';


@Injectable({
	providedIn: 'root'
})

export class SocketService extends Socket{

	public socketStatus = false;

	constructor() {
		super({ url: environment.socketURL, options: {} });
	}

	printCard(msg: {}) {
		this.emit("printOwner", msg);
	}

	getPrintResult() {
		return this.fromEvent("printStatus").pipe(data => data);
	}
	
	printerStatus() {
		return this.fromEvent("printerStatus").pipe(status => status);
	}
	
	getOwnerActivateStatus(){
		return this.fromEvent("ownerActivateStatus").pipe(status => status);
	}
	
	getGuestActivateStatus(){
		return this.fromEvent("guestActivateStatus").pipe(status => status);
	}

	printGroupGuestDone() {
		return this.fromEvent("printGroupGuestDone").pipe(statusData => statusData);
	}

	householdActivateStatus(){
		return this.fromEvent("householdActivateStatus").pipe(status => status);
	}

	printHouseholdDone() {
		return this.fromEvent("printHouseholdStatus").pipe(statusData => statusData);
	}

	rentalActivateStatus(){
		return this.fromEvent("rentalActivateStatus").pipe(status => status);
	}

	printRentalDone() {
		return this.fromEvent("printRentalsStatus").pipe(statusData => statusData);
	}

	printStaffDone() {
		return this.fromEvent("printStaffStatus").pipe(statusData => statusData);
	}

	staffActivateStatus(){
		return this.fromEvent("staffActivateStatus").pipe(status => status);
	}

	connectError() {
		return this.fromEvent("connect_error").pipe();
	}

	connect() {
		return this.fromEvent("connect").pipe();
	}
}