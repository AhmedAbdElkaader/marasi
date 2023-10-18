import { NgModule } from '@angular/core';
import { GuestCardsComponent } from './guest-cards.component';
import { ThemeModule } from '../../../@theme/theme.module';

@NgModule({
  declarations: [GuestCardsComponent],
  imports: [
    ThemeModule
  ],
  exports: [GuestCardsComponent]
})
export class GuestCardsModule { }
