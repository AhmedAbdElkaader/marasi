import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './fileupload.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { AngularFileUploaderModule } from 'angular-file-uploader';

@NgModule({
  declarations: [FileUploadComponent],
  imports: [
    CommonModule,
    ThemeModule,
    AngularFileUploaderModule
  ],
  exports: [FileUploadComponent]
})
export class FileUploadModule { }
