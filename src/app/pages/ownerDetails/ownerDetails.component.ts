import { Component, Input, ViewChildren, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { NbDialogService } from '@nebular/theme';
import { CardComponent } from './card/card.component';
import { SocketService } from '../../services/socket-service.service'
import { ToasterConfig } from 'angular2-toaster';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
	selector: 'owner',
	styleUrls: ['./ownerDetails.component.scss'],
	templateUrl: './ownerDetails.component.html',
})


export class ownerDetailsComponent implements OnInit{

	@ViewChildren('accordionOwners') accordionOwners;
	@ViewChildren('accordionItems') accordionItems;
	@ViewChildren('printButtons') printButtons;
	@ViewChildren('activateButtons') activateButtons;
	@ViewChild('printAllBtton') printAllBtton;
	@ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;
	@ViewChild('imgToPrint') imgToPrint;
	@ViewChild('nameToPrint') nameToPrint;
	@ViewChild('addressToPrint') addressToPrint;
	@ViewChild('cardtoPrint') cardtoPrint;
	@ViewChild('tmpdiv') tmpdiv;
	

	btn: boolean = false;
	@Input() selectedOwnersList: any[] = [];
	@Input() unitId = 0;
	// @Input() socketService: SocketService
	activatedAccordionIndex = -1

	public icon = "fa fa-angle-double-down";

	ownertoPrint: any
	oldValue: any
	new: boolean = false

	loadingLargeGroup = false;
	loadingLargeGroupActivate = false;
	config: ToasterConfig;

	constructor(private dialogService: NbDialogService, private toastrService: NbToastrService, public rest: RestService, private socketService: SocketService) {

	}

	toggle() {

		this.accordionItems._results.forEach(element => {
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

	openWindow(rowIndex = null) {
		let ownerToEdit = this.selectedOwnersList[rowIndex]
		this.dialogService.open(
			CardComponent,
			{
				closeOnEsc: false,
				closeOnBackdropClick: false,
				context: {
					type: "owner",
					"cardToEdit": ownerToEdit
				}
			},
		).onClose.subscribe((data: {}) => {
			console.log(data)
		})

	}

	ngOnInit() {
		let _this = this
		this.socketService.getPrintResult().subscribe((result: any) => {
			result.forEach(element => {
				if (!element.message.toLowerCase().includes("failed")) {
					let cardIndex = _this.selectedOwnersList.findIndex(ownerCard => ownerCard.id == element.id)
					var cardRow: any = _this.selectedOwnersList[cardIndex]
					cardRow.printed = true
					_this.selectedOwnersList[cardIndex] = cardRow
					// update database (owner card, transaction)
					_this.rest.updateOwnerPrint(cardRow.id, 1).subscribe((response) => {
					})
					_this.printButtons._results[cardIndex].hostElement.nativeElement.disabled = true
				}
			});
			this.loadingLargeGroup = false
		})

		this.socketService.getOwnerActivateStatus().subscribe((result: any) => {
			this.loadingLargeGroupActivate = false
			if (!result.status) {
				_this.showToast(NbToastStatus.DANGER, "Activate Card", "error writing card, please try again")
			} else {
				_this.showToast(NbToastStatus.SUCCESS, "Activate Card", "card activated")
				var cardRow: any = _this.selectedOwnersList[result.list_id]
				cardRow.activated = true
				_this.selectedOwnersList[result.list_id] = cardRow
				_this.rest.updateOwnerActivated(cardRow.id, 1, result.card_id).subscribe((response) => {

				})
				_this.activateButtons._results[result.list_id].hostElement.nativeElement.disabled = true

			}
		})
	}

	activateCard(index) {
		let ownerRow = this.selectedOwnersList[index]
		this.loadingLargeGroupActivate = true
		let card_object = {
			"cardType": 1,
			"cardId": ownerRow.card_id ? ownerRow.card_id : Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5),
			"isActiv": true,
			"Address": ownerRow.unitFullName.replace("Marassi ", ""),
			'list_id': index
		}
		ownerRow.card_id = card_object.cardId
		this.socketService.emit("ActivateOwnerCard", card_object)

	}

	printCard(index) {
		let ownerRow = this.selectedOwnersList[index]
		if (ownerRow.printed || !ownerRow.files[0].defaultOne) return

		this.loadingLargeGroup = true
		let ownerCardData: any = {}
		ownerCardData.name = ownerRow.name;
		ownerCardData.unitFullName = ownerRow.unitFullName;
		ownerCardData.image = `${window.location.origin}/api/units/get_images/${ownerRow.unit_id}/${ownerRow.files[0].id}/${ownerRow.files[0].ext}`;
		ownerCardData.id = ownerRow.id
		this.socketService.emit("printOwner", [ownerCardData])
	}

	ownerPrintAll() {

		// let recordsFiltered = this.selectedOwnersList.filter((value: any, index: number) => {
		// 	if (value.files.length < 1) return false 
		// 	let val = !value.printed && value.files[0].defaultOne
		// 	return val
		// })
		// if (!recordsFiltered || recordsFiltered.length == 0) return
		// this.loadingLargeGroup = true

		let recordsToSend = []
		this.selectedOwnersList.forEach((ownerRow: any, index) => {
			if (ownerRow.files.length < 1) return
			if (ownerRow.printed || !ownerRow.files[0].defaultOne) return

			let ownerCardData: any = {}
			ownerCardData.name = ownerRow.name;
			ownerCardData.unitFullName = ownerRow.unitFullName;
			ownerCardData.image = `${window.location.origin}/api/units/get_images/${ownerRow.unit_id}/${ownerRow.files[0].id}/${ownerRow.files[0].ext}`;
			ownerCardData.id = ownerRow.id
			recordsToSend.push(ownerCardData)
		})
		if (recordsToSend.length > 0) {
			this.loadingLargeGroup = true
			this.socketService.emit("printOwner", recordsToSend)

		}
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

	ngOnChanges($event) {
		// console.log($event)
	}

}
