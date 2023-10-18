import { NgModule} from '@angular/core';

import { ThemeModule } from '../../../@theme/theme.module';

import { CardComponent } from './card.component';



@NgModule({
  imports: [
    ThemeModule
    ],
  declarations: [
    CardComponent
  
  ],
  exports: [CardComponent],
  
})
export class cardModule { }