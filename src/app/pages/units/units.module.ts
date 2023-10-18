import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { UnitsComponent } from './units.component';
import { ownerDetailsModule } from '../ownerDetails/ownerDetails.module';
import { StatusCardModule } from '../components/status-card/status-card.module';
import { GuestCardsModule } from '../components/guest-cards/guest-cards.module';
import { FormsModule } from '@angular/forms';
import { HouseholdModule } from '../components/household/household.module';
import { RentalsModule } from '../components/rentals/rentals.module';
import { RFIDModule } from '../components/rfid/rfid.model';



@NgModule({
  imports: [
    ThemeModule,
    ownerDetailsModule,
    StatusCardModule,
    GuestCardsModule,
    FormsModule,
    HouseholdModule,
    RentalsModule,
    RFIDModule
    ],
  declarations: [
    UnitsComponent,

  ],

})
export class UnitsModule { }