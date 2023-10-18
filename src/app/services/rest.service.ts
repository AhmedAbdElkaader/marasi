import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Payments } from '../pages/payments/payments.model';
import { Rental } from '../pages/units/rental.model';
import {  Subject } from 'rxjs';

// const endpoint = environment.apiurl;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin':'*',
  })
};

@Injectable({
  providedIn: 'root'
})

export class RestService  {

  arr = []

  private subject = new Subject<any>();

  sendData(event) {
    this.subject.next(event);
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }


  constructor(private http: HttpClient, private router: Router) { }
  
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  public getRfid(unitId){

 
    return this.http.get(`/api/units/rfid/${unitId}`,httpOptions).pipe(
      map(this.extractData));
  }

  public saveUnitRfid(unit_id,  rfid){
    let arr = rfid.split(String.fromCharCode(10))
    arr.pop()

    let obj = {
      "unit_id": unit_id,
      "rfid": arr
    }

    return this.http.post(`/api/units/rfid/`, obj, httpOptions).pipe(
      map(this.extractData));
  }

  public getStaffData(){
    return this.http.get(`/api/staff/`,httpOptions)
  }

  public getUrl(){
    return 'endpoint'
  }
  
  public getImages(unitId, foldername, fileId){
    return this.http.get(`/api/units/get_images/${unitId}/${foldername}/${fileId}`, httpOptions).pipe(
      map(this.extractData));
  }

  public getUnitDocuments(unitId){
    return this.http.get(`/api/units/files/${unitId}`, httpOptions).pipe(
      map(this.extractData));
  }

  public getVillages(): Observable<any> {
    return this.http.get("endpoint" + 'villages', httpOptions).pipe(
      map(this.extractData));
  }

  public getOwnersByname(searchString) {
    // console.log('searchString: ' + searchString)
    return this.http.get(`/api/units/${searchString}`, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError('searchUnits'))
      );
  }

  public getOwnersByUnitId(searchString) {
    // console.log('searchString: ' + searchString)
    return this.http.get(`/api/owners/getOwnersByUnitId/${searchString}`, httpOptions).pipe(
      map(this.extractData));
  }

  public getOwnerById(searchString) {
    // console.log('searchString: ' + searchString)
    return this.http.get(`/api/getOwnerById/${searchString}`, httpOptions).pipe(
      map(this.extractData));
  }

  public updateOwnerActivated(ownerId, val, cardId) {
    return this.http.get(`/api/owners/updateOwnerActivated/${ownerId}/${val}/${cardId}`, httpOptions).pipe(
      map(this.extractData));    
  }
  
  public updateOwnerPrint(ownerId, val) {
    return this.http.get(`/api/owners/updateOwnerPrint/${ownerId}/${val}`, httpOptions).pipe(
      map(this.extractData));    
  }


  public updateHouseholdActivated(personId, val, cardId) {
    return this.http.get(`/api/household/updateActivated/${personId}/${val}/${cardId}`, httpOptions).pipe(
      map(this.extractData));    
  }
  

  public updateRentalActivated(personId, val, cardId) {
    return this.http.get(`/api/rental/updateActivated/${personId}/${val}/${cardId}`, httpOptions).pipe(
      map(this.extractData));    
  }


  public updateStaffActivated(personId, val, cardId) {
    return this.http.get(`/api/staff/updateActivated/${personId}/${val}/${cardId}`, httpOptions).pipe(
      map(this.extractData));    
  }

  public updateRentalPrint(personId, val) {
    return this.http.get(`/api/rental/updatePrint/${personId}/${val}`, httpOptions).pipe(
      map(this.extractData));
  }

  public updateStaffPrint(personId, val) {
    return this.http.get(`/api/staff/updatePrint/${personId}/${val}`, httpOptions).pipe(
      map(this.extractData));
  }  

  public updateHouseholdPrint(personId, val) {
    return this.http.get(`/api/household/updatePrint/${personId}/${val}`, httpOptions).pipe(
      map(this.extractData));
  }


  public generateCards(unitId) {
    return this.http.post(`/api/guests/${unitId}`, httpOptions).pipe(
      map(this.extractData)

      );
  }

  public generateReport() {
    return this.http.get(`/api/units/report`, httpOptions)
    
  }

  public generateExtraCards(unitId) {
    return this.http.post(`/api/guests/extra/${unitId}`, httpOptions).pipe(
      map(this.extractData)

      );
  }

  public getGuestCards(unitId) {
    return this.http.get(`/api/guests/${unitId}`, httpOptions).pipe(
      map(this.extractData)
      );
  }

  public updateGuestPrint(ownerId, val) {
    return this.http.get(`/api/guests/updateGuestPrint/${ownerId}/${val}`, httpOptions).pipe(
      map(this.extractData));    
  }

  public updateGuestActivated(guestId, val, cardId) {
    return this.http.get(`/api/guests/updateGuestActivated/${guestId}/${val}/${cardId}`, httpOptions).pipe(
      map(this.extractData));    
  }

  public getUnpaidRentals(): Observable<any> {
    return this.http.get('/api/rental/unpaid', httpOptions).pipe(
      map(this.extractData));
  }

  public getpaidRentals(): Observable<any> {
    return this.http.get('/api/rental/paid', httpOptions).pipe(
      map(this.extractData));
  }

  public updateRentalPayments(payments: Payments) {
    return this.http.post('/api/rental/update', payments, httpOptions).pipe(
      map(this.extractData));
  }

  public saveRental(rental: any) {
    return this.http.post('/api/rental/', rental, httpOptions).pipe(
      map(this.extractData));
  }

  public getRentalsByUnitId(unit_id) {
    return this.http.get(`/api/rental/getRentalByUnit/${unit_id}`, httpOptions).pipe(
      map(this.extractData));
  }

  public getHHByUnitId(searchString) {
    // console.log('searchString: ' + searchString)
    return this.http.get(`/api/household/getHHByUnitId/${searchString}`, httpOptions).pipe(
      map(this.extractData));
  }


  getAllGats(){
    return this.http.get(`/api/gates/allGates/`,httpOptions).pipe(map(this.extractData));
  }
  getReports(obj){
    return this.http.get(`/api/accesslog/controllerLog/?gate_id=${obj.id}&startDate=${obj.startDate}&endDate=${obj.endDate}`,httpOptions).pipe(
      map(this.extractData));
  }
  getReportByCase(obj){
    if(obj.input_type == '10'){
      return this.http.get(`/api/accesslog/inputLog/?input_type=${obj.input_type}&gate_id=${obj.id}&startDate=${obj.startDate}&endDate=${obj.endDate}`,httpOptions).pipe(
        map(this.extractData));

    }else{
      return this.http.get(`/api/accesslog/inputLog/?input_type=${'0'+obj.input_type}&gate_id=${obj.id}&startDate=${obj.startDate}&endDate=${obj.endDate}`,httpOptions).pipe(
        map(this.extractData));
    }
  }
  getReportSingleUnitAll(obj){
    return this.http.get(`/api/accesslog/unitFullLog/?unit_id=${obj.unitID}&gate_id=${obj.id}&startDate=${obj.startDate}&endDate=${obj.endDate}`,httpOptions).pipe(
      map(this.extractData));
  }
  getReportSingleUnitOwners(obj){
    return this.http.get(`/api/accesslog/ownerLogs/?unit_id=${obj.unitID}&gate_id=${obj.id}&startDate=${obj.startDate}&endDate=${obj.endDate}`,httpOptions).pipe(
      map(this.extractData));
  }
  getReportSingleUnitGust(obj){
    return this.http.get(`/api/accesslog/guestLogs/?unit_id=${obj.unitID}&gate_id=${obj.id}&startDate=${obj.startDate}&endDate=${obj.endDate}`,httpOptions).pipe(
      map(this.extractData));
  }
  getReportSingleUnithouseHold(obj){
    return this.http.get(`/api/accesslog/houseHoldLogs/?unit_id=${obj.unitID}&gate_id=${obj.id}&startDate=${obj.startDate}&endDate=${obj.endDate}`,httpOptions).pipe(
      map(this.extractData));
  }
  
  public getUnitByname(searchString) {
    return this.http.get(`/api/units/${searchString}`,httpOptions).pipe(
      map(this.extractData));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    var _this = this
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      if (error.status = 401) {
        _this.router.navigate(['auth/login']);
      }

      if (error.status = 400) {
        throwError(error)
        return
      }
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }  

}
