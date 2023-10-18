import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { AllReportsComponent } from './all-reports.component';
import { NbSelectModule, NbInputModule, NbButtonModule,NbCheckboxModule,NbRadioModule,NbListModule,
   NbDatepickerModule,NbCardModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { NbMomentDateModule} from '@nebular/moment'
 import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [AllReportsComponent],
  imports: [
    ThemeModule,
    NbSelectModule,
    NbInputModule,
    NbButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NbDatepickerModule,
    NbCardModule,
    NbCheckboxModule,
    NbListModule,
     NbMomentDateModule,
     NbRadioModule,
     Ng2SmartTableModule
  ],
  exports: [AllReportsComponent]
})
export class allReportsModule { }
