import { NgModule } from '@angular/core';
import { ThemeModule } from '../../../@theme/theme.module';
import { RFIDComponent } from './rfid.component';

@NgModule({
  declarations: [RFIDComponent],
  imports: [
    ThemeModule,
    
  ],
  exports: [RFIDComponent]
})
export class RFIDModule { }
