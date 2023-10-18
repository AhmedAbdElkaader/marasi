import { Component, OnInit, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { SocketService } from '../../services/socket-service.service';
import { initDomAdapter } from '@angular/platform-browser/src/browser';
import { Subscription } from 'rxjs';
import { FileUploadComponent } from '../components/fileupload/fileupload.component';

@Component({
	selector: 'staff',
	templateUrl: './staff.component.html',
	styleUrls: ['./staff.component.scss']
})
export class StaffComponent  implements OnInit {

	subscription: Subscription;

	@ViewChild('selected') selected;
	@ViewChild('titleBox') titleBox: ElementRef
	@ViewChild('title') title;

	@ViewChildren('printButtons') printButtons;
	@ViewChildren('activateButtons') activateButtons;

	callFunc:any;
	staffData: any;
	selectedIndexList = 0;
	selectedTitle = "";
	show2: boolean = false
	showInput = false
	loadingLargeGroup = false;
	loadingLargeGroupActivate: boolean = false;

	Next() {

		if (this.titleBox.nativeElement.value != "") {
			this.show2 = true
		}

	}


	constructor(private rest: RestService, private toastrService: NbToastrService, private socketService: SocketService ,private call: FileUploadComponent) {


	}

	initData() {
		this.rest.getStaffData().subscribe((data) => {
			console.log(data)
			this.staffData = data
		})
	}

	

 	 ngOnInit() {

		this.initData()
	
		this.subscription = this.rest.getData().subscribe(data => {
			if (data != "") {
				this.initData();
			}
		})


		let _this = this
		this.selected.selectedChange.subscribe((val) => {
			console.log(val)

			if (val > 0) {
				_this.selectedTitle = _this.selected.selectionModel[0].content
				_this.selectedIndexList = val
				if (val > 0 && val <= 2) {
					_this.titleBox.nativeElement.hidden = false
					_this.title.nativeElement.hidden = false
				} else {
					_this.titleBox.nativeElement.hidden = true
					_this.title.nativeElement.hidden = true
				}
			}
		})

		this.socketService.printStaffDone().subscribe((result: any) => {
			let majIndex = 0
			result.forEach(element => {
				if (!element.message.toLowerCase().includes("failed")) {
					_this.staffData.forEach((staff: any, rentIndex) => {
						let cardIndex = staff.staff.findIndex(staffCard => staffCard.id == element.id)
						if (cardIndex > -1) {
							var cardRow: any = staff.staff[cardIndex]
							cardRow.printed = true
							staff.staff[cardIndex] = cardRow
							_this.rest.updateStaffPrint(cardRow.id, 1).subscribe((response) => {
							})
							_this.printButtons._results[cardIndex + majIndex].hostElement.nativeElement.disabled = true
							this.loadingLargeGroup = false

							return
						}
						majIndex += staff.staff.length

					})

				}
			});
		})

		this.socketService.staffActivateStatus().subscribe((result: any) => {
			let majIndex = 0
			this.loadingLargeGroupActivate = false
			if (!result.status) {
				_this.showToast(NbToastStatus.DANGER, "Activate Card", "error writing card, please try again")
			} else {
				_this.showToast(NbToastStatus.SUCCESS, "Activate Card", "card activated")
				_this.staffData.forEach((staff: any, rentIndex) => {

					let cardIndex = staff.staff.findIndex(staffCard => staffCard.id == result.list_id)
					if (cardIndex > -1) {
						var cardRow: any = staff.staff[cardIndex]
						cardRow.printed = true
						staff.staff[cardIndex] = cardRow
						_this.rest.updateStaffActivated(cardRow.id, 1, cardRow.card_id).subscribe((response) => {
						})
						_this.activateButtons._results[cardIndex + majIndex].hostElement.nativeElement.disabled = true
						return
					}
					majIndex += staff.staff.length

				})
			}
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
	printCard(index, subIndex) {
		let staffCardRow = this.staffData[index].staff[subIndex]
		if (staffCardRow.printed || !staffCardRow.files[0].defaultOne) return

		this.loadingLargeGroup = true
		let staffCardData: any = {}
		staffCardData.name = staffCardRow.name;
		staffCardData.unitFullName = staffCardRow.title;
		staffCardData.image = this.staffData[index].id < 6 ? `${window.location.origin}/api/staff/get_images/${this.staffData[index].id}/${staffCardRow.files[0].id}/${staffCardRow.files[0].ext}` : "";
		staffCardData.id = staffCardRow.id
		this.socketService.emit("printStaff", [staffCardData])
	}


	activateCard(index, subIndex) {
		let staffCardRow = this.staffData[index].staff[subIndex]
		this.loadingLargeGroupActivate = true
		let card_object = {
			"cardType": this.staffData[index].id < 6 ? 5 : 99,
			"cardId": staffCardRow.card_id ? staffCardRow.card_id : Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5),
			"isActiv": true,
			"Address": "dummy add",
			'list_id': staffCardRow.id
		}
		staffCardRow.card_id = card_object.cardId
		this.socketService.emit("ActivateStaffCard", card_object)
	}

}
