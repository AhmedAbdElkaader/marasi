import { NgModule } from '@angular/core';
import { ThemeModule } from '../../../@theme/theme.module';
import { StatusCardComponent } from './status-card.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    StatusCardComponent
  ],
  exports: [StatusCardComponent],
 
})

export class StatusCardModule { }
