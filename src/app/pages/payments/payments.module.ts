import { NgModule} from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { PaymentsComponent } from './payments.component';
import { NbSpinnerModule } from '@nebular/theme';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    PaymentsComponent
  ],
  exports: [PaymentsComponent],
 
})
export class paymentsModule { }