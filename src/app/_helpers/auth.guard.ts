import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from "@app/_services";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authenticationService.authenticateUser;
        if (user) {
            // logged in so return true
            var role = this.authenticationService.getRole();
            if(role === undefined)
            {
                this.authenticationService.logOut();
                this.router.navigate(['/']);
                return false;
            }
            var area = route.url[0].path;
            if(!area.startsWith(role))
            {
                if(role != 'patron')
                {
                    this.router.navigate(['/employee']);
                }
                else
                {
                    this.router.navigate(['/patron']);
                }
                return false;
            }

            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}