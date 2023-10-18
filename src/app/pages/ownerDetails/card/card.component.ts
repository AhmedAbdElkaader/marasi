import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { RestService } from '../../../services/rest.service';

@Component({
	selector: 'card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

	@Input() cardToEdit: any ;
	@Input() type: string ;
	@ViewChild("name") name 
	@ViewChild("printed") printed 


	changed: boolean = false
	constructor(protected ref: NbDialogRef<CardComponent>, public rest: RestService) { 


	}

	ngOnInit() { 

	} 



	check($event) {
		this.changed = true
		// if ($event.srcElement.id == "printCheckbox")
		// 	this.ownerToEdit.printed = $event.srcElement.checked

		// if ($event.srcElement.id == "name")
		// 	this.ownerToEdit.name = $event.srcElement.value			
		
	}

	cancel() {
		this.ref.close()
	}

	save() {
		// this.windowRef.onClose.pipe(this.ownerToEdit.owner)
		// this.windowRef.onClose.
		if (this.changed) {
			if (this.type == 'owner') 
				this.cardToEdit.name = this.name.nativeElement.value
	
				this.cardToEdit.printed = this.printed.nativeElement.checked
		}
		this.ref.close(this.changed ? this.cardToEdit : null);
		// console.log(this.ownerToEdit)
	}
}
