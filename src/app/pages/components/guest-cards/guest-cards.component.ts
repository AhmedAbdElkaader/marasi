import { Component, OnInit, ViewChild, Input, EventEmitter, ViewChildren } from '@angular/core';
import { RestService } from '../../../services/rest.service';
import { SocketService } from '../../../services/socket-service.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbGlobalPhysicalPosition, NbToastrService, NbDialogService } from '@nebular/theme';
import { CardComponent } from '../../ownerDetails/card/card.component';
import { FileUploadComponent } from '../fileupload/fileupload.component';

@Component({
  selector: 'guest-cards',
  templateUrl: './guest-cards.component.html',
  styleUrls: ['./guest-cards.component.scss']
})
export class GuestCardsComponent implements OnInit {

  @ViewChild('generateButton') generateButton;
  @ViewChild('printAllButton') printAllButton;
  @ViewChildren('printButtons') printButtons;
  @ViewChildren('accordionItems') accordionItems; 
  @ViewChildren('accordionItems2') accordionItems2;
  @Input() unitId;
  @Input() unitName;
  @Input() guestCardsList: any[] = [] 


  loadingLargeGroup = false;
  loadingLargeGroupActivate = false;
  constructor(private dialogService: NbDialogService, private toastrService: NbToastrService, public rest: RestService, private socketService: SocketService) { }

  ngOnInit() {
    let _this = this
    this.socketService.printGroupGuestDone().subscribe((result: any[]) => {
      console.log(result)
      result.forEach(element => {
        if (!element.message.toLowerCase().includes("failed")) {
          let cardIndex = _this.guestCardsList.findIndex(guestCard => guestCard.id == element.id)
          var cardRow: any = _this.guestCardsList[cardIndex]
          cardRow.printed = true
          _this.guestCardsList[cardIndex] = cardRow
          // update database (owner card, transaction)
          _this.rest.updateGuestPrint(cardRow.id, 1).subscribe((response) =>{
            console.log(response)
          })
          _this.printButtons._results[cardIndex].hostElement.nativeElement.disabled = true
        }       
      });
	  this.loadingLargeGroup = false

    })

		this.socketService.getGuestActivateStatus().subscribe((result: any) =>{
			this.loadingLargeGroupActivate = false
			if (!result.status) {
				_this.showToast(NbToastStatus.DANGER, "Activate Card", "error writing card, please try again")
			} else {
				_this.showToast(NbToastStatus.SUCCESS, "Activate Card", "card activated")
				var cardRow: any = _this.guestCardsList[result.list_id]
				cardRow.activated = true
				_this.guestCardsList[result.list_id] = cardRow				
				_this.rest.updateGuestActivated(cardRow.id, 1, result.card_id).subscribe((response) => {

				})
			}
    })
		
  }
	activateCard(index){
		let ownerRow = this.guestCardsList[index]
	
		// this.loadingLargeGroupActivate = true
		let card_object = {
			"cardType": 2,
			"cardId": Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5),
			 "isActiv": true,
			 "Address": this.unitName.replace("Marassi ", ""),
			 'list_id': index
		}
		ownerRow.card_id = card_object.cardId
		this.socketService.emit("ActivateGuestCard", card_object)
		
	}
  generateCrads() {
    this.loadingLargeGroup = true;

    this.rest.generateCards(this.unitId).subscribe((response: any) => {
      this.guestCardsList = response
	  this.loadingLargeGroup = false;


	}) 	

  }

  generateExtraCards() {

    this.rest.generateExtraCards(this.unitId).subscribe((response: any) => {
      this.guestCardsList.concat(response)

    })
  }


  
  printCard(index) {
    let cardToPrint = this.guestCardsList[index]
    if (cardToPrint.printAll) return

    this.loadingLargeGroup = true
    this.socketService.emit("getGuestData", [cardToPrint], this.unitName)
  }

	printAll(){
    
    let recordsToSend = this.guestCardsList.filter((value: any, index: number)=> {return !value.printed})
    if (!recordsToSend || recordsToSend.length == 0) return
    this.loadingLargeGroup = true
    this.socketService.emit("getGuestData", recordsToSend, this.unitName)
  }
  
  private showToast(type: NbToastStatus, title: string, body: string) {
		const config = {
			status: type,
			destroyByClick: true,
			duration: 20000,
			hasIcon: false,
			position: NbGlobalPhysicalPosition.TOP_RIGHT,
			preventDuplicates: false,
		};
		const titleContent = title ? ` ${title}` : '';

		this.toastrService.show(
			body,
			`${titleContent}`,
			config);
  }
  
  convertToOwenr() {
		this.dialogService.open(
			FileUploadComponent,
			{
			
				closeOnEsc: false,
				closeOnBackdropClick: true,
				
			},
		).onClose.subscribe()
  }

	btn: boolean = false;
	public icon = "fa fa-angle-double-down";

  toggle() {

		this.accordionItems._results.forEach(element => {
			console.log(element)
			element.toggle();
		});
		this.accordionItems2._results.forEach(element => {
			element.toggle();
		});
		if (this.btn == false) {
			this.icon = "fa fa-angle-double-up"
			this.btn = true;
		}
		else {
			this.btn = false;
			this.icon = "fa fa-angle-double-down"
		}
  }
  

}