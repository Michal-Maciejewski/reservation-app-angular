import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home";
import { LayoutComponent } from "./layout";
import { NavMenuComponent } from "./nav-menu";
import { PatronRoutingModule } from "./patron-routing.module";


@NgModule({
    imports:
    [
        CommonModule,
        PatronRoutingModule
    ],
    declarations: 
    [
        LayoutComponent,
        HomeComponent,
        NavMenuComponent
    ]
})
export class PatronModule {}