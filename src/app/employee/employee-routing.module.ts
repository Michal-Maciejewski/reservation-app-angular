import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeManagerComponent } from './employee-manage/employee-manage.component';
import { HomeComponent } from './home';
import { LayoutComponent } from './layout';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { SeatingAreaComponent } from './seating-area/seating-area.component';
import { SittingComponent } from './sittings/sitting.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: HomeComponent},
            { path: 'ordersummary', component: OrderSummaryComponent},
            { path: 'sitting', component: SittingComponent},
            { path: 'seatingarea', component: SeatingAreaComponent},
            { path: 'employeemanage', component: EmployeeManagerComponent},

            //If no actual path
            {path: '**', redirectTo: '' }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeeRoutingModule{}