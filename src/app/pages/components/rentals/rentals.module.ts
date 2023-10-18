import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../@theme/theme.module';
import { RentalsComponent } from './rentals.component';
import { FileUploadModule } from '../fileupload/fileupload.module';

@NgModule({
  declarations: [RentalsComponent],
  imports: [
    CommonModule,
    ThemeModule,
    FileUploadModule
  ],
  exports: [RentalsComponent]
})
export class RentalsModule { }
