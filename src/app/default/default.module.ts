import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatChipsModule } from "@angular/material/chips";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldControl, MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatStepperModule } from "@angular/material/stepper";
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
        CommonModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatIconModule,
        MatButtonToggleModule,
        MatRadioModule,
        MatChipsModule,
        FormsModule
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