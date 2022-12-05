import { NgModule } from "@angular/core";
import { EmployeeRoutingModule } from "./employee-routing.module";
import { HomeComponent } from "./home";
import { LayoutComponent } from "./layout";
import { NavMenuComponent } from "./nav-menu";


@NgModule({
    imports: [
        EmployeeRoutingModule
    ],
    declarations: [
        LayoutComponent,
        HomeComponent,
        NavMenuComponent
    ]
})
export class EmployeeModule {}