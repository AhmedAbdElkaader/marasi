import { NgModule} from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { NbSpinnerModule } from '@nebular/theme';
import { ReportComponent } from './acctiveReport.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    ReportComponent
  ],
  exports: [ReportComponent],
 
})
export class acctiveReportModule { }