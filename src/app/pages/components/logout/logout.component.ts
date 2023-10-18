import { Component, OnInit, Inject } from '@angular/core';
import { NbLogoutComponent, NbAuthService, NB_AUTH_OPTIONS, NbTokenService } from '@nebular/auth';
import { Router } from '@angular/router';

export class LogoutComponent extends NbLogoutComponent implements OnInit {
  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected router: Router,
    protected tokenService: NbTokenService
  ) {
    super(service, options, router);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  logout(strategy: string): void {
    super.logout(strategy);
    this.tokenService.clear();
  }
}