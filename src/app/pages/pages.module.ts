import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { UnitsModule } from './units/units.module';
import { UnitsearchModule } from './units/unitsearch/unitsearch.module';
import { ownerDetailsModule } from './ownerDetails/ownerDetails.module';
import { GuestCardsModule } from './components/guest-cards/guest-cards.module';
import { FileUploadModule } from './components/fileupload/fileupload.module';
import { paymentsModule } from './payments/payments.module';
import { HouseholdModule } from './components/household/household.module';
import { RentalsModule } from './components/rentals/rentals.module';
import { StaffModule } from './staff/staff.module';
import { acctiveReportModule } from './acctiveReport/acctiveReport.module';
import { allReportsModule } from './all-reports/all-reports.module';
// import { WindowRefrenceComponent } from './component/window-refrence/window-refrence.component';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    UnitsModule,
    ownerDetailsModule,
    UnitsearchModule,
    GuestCardsModule,
    paymentsModule,
    FileUploadModule,
    HouseholdModule,
    RentalsModule,
    StaffModule,
    acctiveReportModule,
    allReportsModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    
  ],
 
})
export class PagesModule {
}
