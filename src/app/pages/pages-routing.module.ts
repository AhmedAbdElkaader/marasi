import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UnitsComponent } from './units/units.component';
import { PaymentsComponent } from './payments/payments.component';
import { StaffComponent } from './staff/staff.component';
import { ReportComponent } from './acctiveReport/acctiveReport.component';
import { AllReportsComponent } from './all-reports/all-reports.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'units',
      component: UnitsComponent
    },
    {
      path: 'staff',
      component: StaffComponent
    },
    {
      path: 'payments',
      component: PaymentsComponent
    },
    {
      path: 'report',
      component: ReportComponent
    },
    {
      path: 'Allreport',
      component: AllReportsComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
