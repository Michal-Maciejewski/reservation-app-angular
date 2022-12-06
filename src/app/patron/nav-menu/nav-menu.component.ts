import { Component } from "@angular/core";
import { AuthenticationService } from "@app/_services";

@Component({selector: 'app-nav-menu', templateUrl: 'nav-menu.component.html'})
export class NavMenuComponent {

    constructor(private authenticationService: AuthenticationService){}

    logOut()
    {
        this.authenticationService.logOut();
    }
}