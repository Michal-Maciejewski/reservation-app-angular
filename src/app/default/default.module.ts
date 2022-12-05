import { NgModule } from "@angular/core";
import { DefaultRoutingModule } from "./default-routing.module";
import { HomeComponent } from "./home";
import { LayoutComponent } from "./layout";
import { NavMenuComponent } from "./nav-menu";

@NgModule({
    imports:[DefaultRoutingModule],
    declarations:[
        NavMenuComponent,
        HomeComponent,
        LayoutComponent
    ]
})
export class DefaultModule{}