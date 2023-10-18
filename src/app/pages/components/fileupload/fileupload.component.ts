import { Component, Output ,OnInit, ViewChild, Input ,EventEmitter, SimpleChanges} from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { AngularFileUploaderComponent } from 'angular-file-uploader';
import { RestService } from '../../../services/rest.service';

@Component({
  selector: 'fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
}) 
 
export class FileUploadComponent implements OnInit {
  @Input() unitId ;
	@Input() cardType;
	@Input() title;
	@Input() rentalId = 0;
	// @Output() again: EventEmitter<any> = new EventEmitter();
	
	@ViewChild('fileUpload1')
	 fileUpload1 : AngularFileUploaderComponent;

	afuConfig = {
		multiple: true,
		formatsAllowed: ".jpg,.png,.gif,.tif,.bmb",
		maxSize: "5",
		uploadAPI:  {
		  url: "/api/units/upload_images/45",
		  headers: {
		 "enctype" : "multipart/form-data",
		 "Authorization" : `Bearer`,
		 "cardType": "",
		 "title": ""
		  }
		},
		theme: "dragNDrop",
		hideProgressBar: false,
		hideResetBtn: false,
		hideSelectBtn: true,
		replaceTexts: {
		  selectFileBtn: 'Select Files',
		  resetBtn: 'Reset',
		  uploadBtn: 'Upload',
		  dragNDropBox: 'Drag N Drop',
		  attachPinBtn: 'Attach Files...',
		  afterUploadMsg_success: 'Successfully Uploaded !',
		  afterUploadMsg_error: 'Upload Failed !'
		}
  };
    
  constructor(private authService: NbAuthService,private rest: RestService) { 
    this.authService.getToken().subscribe((token) => {
			this.afuConfig.uploadAPI.headers.Authorization = `Bearer ${token}`
			
    })
	// console.log(this.afuConfig)
	
  }

  ngOnInit() {
	  
   }

   

	DocUpload($event){
		this.fileUpload1.resetFileUpload();
		this.rest.sendData($event)
	}	

	ngOnChanges($event) {

		console.log($event)
		// if ($event.unitId && $event.unitId.currentValue > 0) {
			this.afuConfig.uploadAPI.url = `/api/units/upload_images/${$event.unitId.currentValue}/${$event.rentalId ? $event.rentalId.currentValue : 0}`
		// }

		if ($event.cardType && typeof($event.cardType.currentValue) == "string" ) {
			this.afuConfig.uploadAPI.headers.cardType = $event.cardType.currentValue
		}

		if ($event.title && typeof($event.title.currentValue) == "string" ) {
			this.afuConfig.uploadAPI.headers.title = $event.title.currentValue
		}
		let xObject:any = { 'config': this.afuConfig}
		let changeObject: any = {}
		changeObject.currentValue = xObject
		this.fileUpload1.ngOnChanges(changeObject)
	}
}
