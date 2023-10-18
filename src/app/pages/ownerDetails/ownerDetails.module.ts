import { NgModule} from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ownerDetailsComponent } from './ownerDetails.component';
import { FileUploadModule } from '../components/fileupload/fileupload.module';

@NgModule({
  imports: [
    ThemeModule,
    FileUploadModule
  ],
  declarations: [
    ownerDetailsComponent
  ],
  exports: [ownerDetailsComponent],
 
})
export class ownerDetailsModule { }