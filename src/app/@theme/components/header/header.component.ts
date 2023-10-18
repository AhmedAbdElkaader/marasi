import { Component, Input } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { takeWhile, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NbAccessChecker, NbAclService, NbAccessControl } from '@nebular/security';
import { AuthGuardService } from '../../../services/auth-guard.service';
import { NbAuthService } from '@nebular/auth';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out', link: '/auth/logout' }];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserService,
    private analyticsService: AnalyticsService,
    private authService: NbAuthService,
    private authGuard: AuthGuardService,
    public nbAclService: NbAclService,
    public accessChecker: NbAccessChecker,
    private router: Router) {

    var kokowawa = this;


    this.menuService.onItemSelect()
      .pipe(
        takeWhile(() => true),
        delay(20),
      )
      .subscribe((hh) => {
        this.accessChecker.isGranted("view", hh.item.title)
          .subscribe(isGranted => {
            // hh.item.hidden = !isGranted
            if (!isGranted) {
              kokowawa.router.navigate(['#']);
            }
          })
      });

    this.authService.onTokenChange().subscribe(token => {
      if (token.isValid()) {
        // console.log(token.isValid())
        kokowawa.user = token.getPayload(); // here we receive a payload from the token and assigne it to our `user` variable
        kokowawa.nbAclService.setAccessControl(JSON.parse(kokowawa.user.accessControl))
      } else {
        kokowawa.authGuard.canActivate()
      }
    });

  }
  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}