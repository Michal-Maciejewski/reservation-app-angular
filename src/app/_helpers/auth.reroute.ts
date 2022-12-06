import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from "@app/_services";

@Injectable({providedIn: 'root'})
export class AuthReroute implements CanActivate{

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authenticationService.authenticateUser;
        if (user) {
            // logged in so return to role homepage

            var role = this.authenticationService.getRole();
            if(role != undefined)
            {
                this.router.navigate(['/' + role]);
                return false;
            }
            else
            {
                this.authenticationService.logOut();
                this.router.navigate(['/']);
                return true;
            }
        }
        // not logged in so stay on default layout
        return true;
    }
}