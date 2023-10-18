import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbAuthJWTToken, NbPasswordAuthStrategy } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import { environment } from '../../environments/environment';

const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'socicon-github',
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'socicon-facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'socicon-twitter',
  },
];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({

    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'a7a',
        token: {
          class: NbAuthJWTToken,
          key: 'Authorization'
        },
        baseEndpoint: '/api/',
        login: {
          endpoint: 'auth/login',
          method: 'POST',
          redirect: {
            success: '/pages/dashboard',
          },
        },
        logout: {
          endpoint: 'logout',
          method: null,
          redirect: {
            success: '/auth/login',
            failure: '/'
          },
        },
        register: {
          endpoint: '/auth/sign-up',
        },
        requestPass: {
          endpoint: '/auth/request-pass',
        },
        resetPass: {
          endpoint: '/auth/reset-pass',
        },
      }),
    ],
    forms: {
      login: {
        strategy: 'a7a'
      },
      logout: {
        strategy: 'a7a'
      },
    },
  }).providers,

  NbSecurityModule.forRoot().providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
