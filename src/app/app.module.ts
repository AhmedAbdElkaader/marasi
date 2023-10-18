/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { UnitsearchComponent } from './pages/units/unitsearch/unitsearch.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LightboxModule } from 'ngx-lightbox';
import { ownerDetailsComponent } from './pages/ownerDetails/ownerDetails.component';
import { ownerDetailsModule } from './pages/ownerDetails/ownerDetails.module';
import { CardComponent } from './pages/ownerDetails/card/card.component';
import { cardModule } from './pages/ownerDetails/card/card.module';

import { SocketIoModule } from 'ngx-socket-io';
import { LogoutComponent } from './pages/components/logout/logout.component';
import { SocketService } from './services/socket-service.service';
import { StatusCardModule } from './pages/components/status-card/status-card.module';
import { StatusCardComponent } from './pages/components/status-card/status-card.component';
import { NbAuthJWTInterceptor, NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '@nebular/auth';
import { GuestCardsComponent } from './pages/components/guest-cards/guest-cards.component';
import { GuestCardsModule } from './pages/components/guest-cards/guest-cards.module';
import { NbWindowModule, NbDatepickerModule, NbSpinnerModule } from '@nebular/theme';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { FileUploadComponent } from './pages/components/fileupload/fileupload.component';
import { FileUploadModule } from './pages/components/fileupload/fileupload.module';
import { paymentsModule } from './pages/payments/payments.module';
import { PaymentsComponent } from './pages/payments/payments.component';
import { HouseholdModule } from './pages/components/household/household.module';
import { HouseholdComponent } from './pages/components/household/household.component';
import { RentalsModule } from './pages/components/rentals/rentals.module';
import { RentalsComponent } from './pages/components/rentals/rentals.component';
import { StaffModule } from './pages/staff/staff.module';

@NgModule({
  declarations: [AppComponent, UnitsearchComponent, LogoutComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    LightboxModule ,
    ownerDetailsModule,
    cardModule,
    StatusCardModule,
    GuestCardsModule,
    FormsModule,
    paymentsModule,
    NbSpinnerModule,
    NbDatepickerModule.forRoot(),
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    SocketIoModule,
    NbWindowModule.forChild(),
    AngularFileUploaderModule,
    FileUploadModule,
    HouseholdModule,
    RentalsModule,
    StaffModule
  ],
  bootstrap: [AppComponent],
  providers: [
    SocketService,
    FileUploadComponent,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},
    {
      provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
      useValue: function (req: HttpRequest<any>) {
        if (req.url === '/api/auth/refresh-token') {
          return true;
        }
        return false;
      },
    },
  ],

  entryComponents: [
    RentalsComponent, HouseholdComponent, FileUploadComponent, UnitsearchComponent,ownerDetailsComponent, CardComponent, StatusCardComponent, GuestCardsComponent, PaymentsComponent
  ],

})
export class AppModule {
}
