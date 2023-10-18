import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseholdComponent } from './household.component';
import { FileUploadModule } from '../fileupload/fileupload.module';
import { ThemeModule } from '../../../@theme/theme.module';

@NgModule({
  declarations: [HouseholdComponent],
  imports: [
    CommonModule,
    FileUploadModule,
    ThemeModule
    
  ],
  exports: [HouseholdComponent]
})
export class HouseholdModule { }
