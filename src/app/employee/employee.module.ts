import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { BrowserModule } from "@angular/platform-browser";
import { FullCalendarModule } from "@fullcalendar/angular";
import { EmployeeManagerComponent } from "./employee-manage/employee-manage.component";
import { EmployeeRoutingModule } from "./employee-routing.module";
import { HomeComponent } from "./home";
import { LayoutComponent } from "./layout";
import { NavMenuComponent } from "./nav-menu";
import { OrderSummaryComponent } from "./order-summary/order-summary.component";
import { SeatingAreaComponent } from "./seating-area/seating-area.component";
import { SittingComponent } from "./sittings/sitting.component";
import { MatDialogClose } from "@angular/material/dialog";
import { DialogAnimationsExampleDialog } from "./sittings/sitting-schedular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        EmployeeRoutingModule,
        MatButtonModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        CommonModule,
        FullCalendarModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        LayoutComponent,
        HomeComponent,
        NavMenuComponent,
        OrderSummaryComponent,
        SeatingAreaComponent,
        SittingComponent,
        EmployeeManagerComponent,
        DialogAnimationsExampleDialog
    ]
})
export class EmployeeModule {}