import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { FileUploadModule } from '../components/fileupload/fileupload.module';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  declarations: [StaffComponent],
  imports: [
    CommonModule,
    FileUploadModule,
    FormsModule,
    ThemeModule
  ],
  exports: [StaffComponent]
})
export class StaffModule { }
