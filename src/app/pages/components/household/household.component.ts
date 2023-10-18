import { Component, Input, ViewChildren, AfterViewInit, OnInit } from '@angular/core';
import { RestService } from '../../../services/rest.service';
import { SocketService } from '../../../services/socket-service.service';

import { ToasterConfig } from 'angular2-toaster';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'household',
  templateUrl: './household.component.html',
  styleUrls: ['./household.component.scss']
})
export class HouseholdComponent implements OnInit {

	btn: boolean = false;
	public icon = "fa fa-angle-double-down";

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

  @Input() unitId = 0;
  @Input() unitName = ""
  @Input() selectedHHList = []
//   @Input() socketService: SocketService

  @ViewChildren('printButtons') printButtons;
  @ViewChildren('activateButtons') activateButtons;
  @ViewChildren('accordionItems') accordionItems;

  config: ToasterConfig;

  loadingLargeGroup: Boolean = false
  loadingLargeGroupActivate: Boolean = false
  
  constructor(public rest: RestService, private toastrService: NbToastrService, private socketService: SocketService) { }


	printCard(index) {
		let hhCardRow = this.selectedHHList[index]
		if (hhCardRow.printed || !hhCardRow.files[0].defaultOne) return

		this.loadingLargeGroup = true
		let ownerCardData: any = {}
		ownerCardData.name = hhCardRow.name;
		ownerCardData.unitFullName = this.unitName;
		ownerCardData.image = `${window.location.origin}/api/units/get_hh_images/${hhCardRow.unit_id}/${hhCardRow.files[0].id}/${hhCardRow.files[0].ext}`;
		ownerCardData.id = hhCardRow.id
		this.socketService.emit("printHousehold", [ownerCardData])
	}

	printAll() {

		let recordsFiltered = this.selectedHHList.filter((value: any, index: number) => {
			let val = !value.printed && value.files[0].defaultOne
			return val
		})
		if (!recordsFiltered || recordsFiltered.length == 0) return
		this.loadingLargeGroup = true

		let recordsToSend = []
		recordsFiltered.forEach((hhCardRow: any, index) => {
			let ownerCardData: any = {}
			ownerCardData.name = hhCardRow.name;
			ownerCardData.unitFullName = this.unitName;
			ownerCardData.image = `${window.location.origin}/api/units/get_hh_images/${hhCardRow.unit_id}/${hhCardRow.files[0].id}/${hhCardRow.files[0].ext}`;
			ownerCardData.id = hhCardRow.id
			recordsToSend.push(ownerCardData)
		})

		this.socketService.emit("printHousehold", recordsToSend)
	}

	activateCard(index) {
		let hhCardRow = this.selectedHHList[index]
		this.loadingLargeGroupActivate = true
		let card_object = {
			"cardType": 3,
			"cardId": hhCardRow.card_id ? hhCardRow.card_id : Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5),
			"isActiv": true,
			"Address": this.unitName.replace("Marassi ", ""),
			'list_id': index
		}
		hhCardRow.card_id = card_object.cardId
		this.socketService.emit("ActivateHouseholdCard", card_object)
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

	ngOnInit() {
		let _this = this
		this.socketService.printHouseholdDone().subscribe((result: any) => {
			result.forEach(element => {
				if (!element.message.toLowerCase().includes("failed")) {
					let cardIndex = _this.selectedHHList.findIndex(ownerCard => ownerCard.id == element.id)
					var cardRow: any = _this.selectedHHList[cardIndex]
					cardRow.printed = true
					_this.selectedHHList[cardIndex] = cardRow
					_this.rest.updateHouseholdPrint(cardRow.id, 1).subscribe((response) => {
					})
					_this.printButtons._results[cardIndex].hostElement.nativeElement.disabled = true
				}
			});
			this.loadingLargeGroup = false
		})

		this.socketService.householdActivateStatus().subscribe((result: any) => {
			this.loadingLargeGroupActivate = false
			if (!result.status) {
				_this.showToast(NbToastStatus.DANGER, "Activate Card", "error writing card, please try again")
			} else {
				_this.showToast(NbToastStatus.SUCCESS, "Activate Card", "card activated")
				var cardRow: any = _this.selectedHHList[result.list_id]
				cardRow.activated = true
				_this.selectedHHList[result.list_id] = cardRow
				_this.rest.updateHouseholdActivated(cardRow.id, 1, result.card_id).subscribe((response) => {

				})
				_this.activateButtons._results[result.list_id].hostElement.nativeElement.disabled = true

			}
		})
	}	
}