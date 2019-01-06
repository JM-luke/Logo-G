
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';

declare var M: any;

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        // if (currentUser && currentUser.role === 'ROLE_ADMIN') {
        //     // authorised so return true
        //     return true;
        // }
        if (currentUser) {
           
            // // check if route is restricted by role
            if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
                // role not authorised so redirect to home page
                M.toast({html:`insufficient privileges`});
                this.alertService.error('restricted access', true);
                this.router.navigate(['/']);
                return false;
            }
 
            // authorised so return true
            return true;
        }
        // not admin so redirect to home page with the return url
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}