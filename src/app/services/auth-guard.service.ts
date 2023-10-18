import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';
import { NbAclService } from '@nebular/security';
import { NbAccessChecker } from '@nebular/security';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

    constructor(private authService: NbAuthService, private router: Router, private nbAclService: NbAclService, public accessChecker: NbAccessChecker) {

    }

    canActivate() {
        var _this = this
        return this.authService.isAuthenticated()

            .pipe(
                tap(authenticated => {
                if (!authenticated) {
                    _this.router.navigate(['auth/login']);
                }
                    // } else {
                    // return _this.accessChecker.isGranted("view", "dummypage2")
                    //     .subscribe(isGranted => {
                    //         return isGranted
                    //     })
                    // }
                }),
            );
    }
}