import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { DefaultRoutingModule } from "./default-routing.module";
import { HomeComponent } from "./home";
import { LayoutComponent } from "./layout";
import { LoginComponent } from "./login";
import { NavMenuComponent } from "./nav-menu";
import { RegisterComponent } from "./register/register.component";
import { ReservationComponent } from "./reservation/reservation.compnent";

@NgModule({
    imports:
    [
        DefaultRoutingModule,
        ReactiveFormsModule,
        CommonModule
    ],
    declarations:[
        NavMenuComponent,
        HomeComponent,
        LayoutComponent,
        RegisterComponent,
        LoginComponent,
        ReservationComponent
    ]
})
export class DefaultModule{}