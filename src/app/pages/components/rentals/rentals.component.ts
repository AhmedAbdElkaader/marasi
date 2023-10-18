import { Component, OnInit, Input, ViewChildren } from '@angular/core';
import { RestService } from '../../../services/rest.service';
import { NbCalendarRange, NbDateService } from '@nebular/theme';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { SocketService } from '../../../services/socket-service.service';
import { range } from 'rxjs';


@Component({
	selector: 'rentals',
	templateUrl: './rentals.component.html',
	styleUrls: ['./rentals.component.scss']
})
export class RentalsComponent implements OnInit {

	@Input() rentalsList: any[] = [];
	@Input() unitId = 0;
	@Input() unitName = ""


	@ViewChildren('printButtons') printButtons;
	@ViewChildren('activateButtons') activateButtons;

	rentalId = 0
	errorMsg = "";
	range: NbCalendarRange<Date>;
	showFileUpload = false;
	loadingLargeGroup = false;
	loadingLargeGroupActivate: boolean = false;
	constructor(protected dateService: NbDateService<Date>, public rest: RestService, private toastrService: NbToastrService, private socketService: SocketService) {
		this.range = {
			start: this.dateService.today(),
			end: this.dateService.today(),
		};
	}

	saveRental() {

		console.log(this.range)
		let _this = this
		// this.rentalsList.forEach((rental: any) => {
		//   if (_this.dateService.compareDates(_this.range.start, rental.rent_from, rental.rent_to)  || _this.dateService.isBetween(_this.range.end, rental.rent_from, rental.rent_to)) {
		//     _this.errorMsg = "Invalid selection"
		//     return
		//   }

		// })

		let amount = 0
		let obj = {
			"unit_id": this.unitId,
			"rent_from": this.dateService.format(this.range.start, "yyyy-MM-dd"),
			"rent_to": this.dateService.format(this.range.end, "yyyy-MM-dd"),
			"amount": amount,
			"paid": false
		}

		this.rest.saveRental(obj).subscribe((response: any) => {
			_this.showFileUpload = true
			_this.rentalId = response.id
		})
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
	getBtnIdx(rentIdx, cardIdx){

	}
	ngOnInit() {
		let _this = this
		this.socketService.printRentalDone().subscribe((result: any) => {
			let majIndex = 0
			result.forEach(element => {
				if (!element.message.toLowerCase().includes("failed")) {
					_this.rentalsList.forEach((rental: any, rentIndex) => {
						let cardIndex = rental.persons.findIndex(rentalCard => rentalCard.id == element.id)
						if (cardIndex > -1) {
							var cardRow: any = rental.persons[cardIndex]
							cardRow.printed = true
							rental.persons[cardIndex] = cardRow
							_this.rest.updateRentalPrint(cardRow.id, 1).subscribe((response) => {
							})
							_this.printButtons._results[cardIndex + majIndex].hostElement.nativeElement.disabled = true
							this.loadingLargeGroup = false

							return
						}
						majIndex +=  rental.persons.length

					})

				}
			});
		})

		this.socketService.rentalActivateStatus().subscribe((result: any) => {
			let majIndex = 0		
			this.loadingLargeGroupActivate = false
			if (!result.status) {
				_this.showToast(NbToastStatus.DANGER, "Activate Card", "error writing card, please try again")
			} else {
				_this.showToast(NbToastStatus.SUCCESS, "Activate Card", "card activated")
				_this.rentalsList.forEach((rental: any, rentIndex) => {

					let cardIndex = rental.persons.findIndex(rentalCard => rentalCard.id == result.list_id)
					if (cardIndex > -1) {
						var cardRow: any = rental.persons[cardIndex]
						cardRow.printed = true
						rental.persons[cardIndex] = cardRow
						_this.rest.updateRentalActivated(cardRow.id, 1, result.card_id).subscribe((response) => {
						})
						_this.activateButtons._results[cardIndex + majIndex].hostElement.nativeElement.disabled = true
						return 
					}
					majIndex +=  rental.persons.length

				})
			}
		})
	}


	printCard(index, subIndex) {
		let rentalCardRow = this.rentalsList[index].persons[subIndex]
		if (rentalCardRow.printed || !rentalCardRow.files[0].defaultOne) return

		this.loadingLargeGroup = true
		let rentalCardData: any = {}
		rentalCardData.name = rentalCardRow.name;
		rentalCardData.unitFullName = this.unitName;
		rentalCardData.image = `${window.location.origin}/api/units/get_rent_images/${this.rentalsList[index].unit_id}/${rentalCardRow.files[0].id}/${rentalCardRow.files[0].ext}`;
		rentalCardData.id = rentalCardRow.id

		rentalCardData.date_from = this.dateService.format(this.rentalsList[index].rent_from, "dd MMMM")  // 
		rentalCardData.date_to = this.dateService.format(this.rentalsList[index].rent_to, "dd MMMM")  // 
		this.socketService.emit("printRentals", [rentalCardData])
	}

	printAll(rentalindex) {

		let recordsFiltered = this.rentalsList[rentalindex].persons.filter((value: any, index: number) => {
			let val = !value.printed && value.files[0].defaultOne
			return val
		})
		if (!recordsFiltered || recordsFiltered.length == 0) return
		this.loadingLargeGroup = true

		let recordsToSend = []
		recordsFiltered.forEach((hhCardRow: any, index) => {
			let rentalCardData: any = {}
			rentalCardData.name = hhCardRow.name;
			rentalCardData.unitFullName = this.unitName;
			rentalCardData.image = `${window.location.origin}/api/units/get_rent_images/${this.rentalsList[rentalindex].unit_id}/${hhCardRow.files[0].id}/${hhCardRow.files[0].ext}`;
			rentalCardData.id = hhCardRow.id
			rentalCardData.date_from = this.dateService.format(this.rentalsList[rentalindex].rent_from, "dd MMMM")  // 
			rentalCardData.date_to = this.dateService.format(this.rentalsList[rentalindex].rent_to, "dd MMMM")  // 
			recordsToSend.push(rentalCardData)
		})

		this.socketService.emit("printRentals", recordsToSend)
	}

	activateCard(index, subIndex) {
		let rentalCardRow = this.rentalsList[index].persons[subIndex]
		this.loadingLargeGroupActivate = true
		let card_object = {
			"cardType": 4,
			"cardId": Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5),
			"isActiv": true,
			"Address": this.unitName.replace("Marassi ", ""),
			'list_id': rentalCardRow.id
		}
		rentalCardRow.card_id = card_object.cardId
		this.socketService.emit("ActivateRentalCard", card_object)
	}

}
