import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const defaultModule = () => import('./default/default.module').then(x => x.DefaultModule);
const employeeModule = () => import('./employee/employee.module').then(x => x.EmployeeModule);
const patronModule = () => import('./patron/patron.module').then(x => x.PatronModule);

const routes: Routes = [
    {path: '', loadChildren:defaultModule},
    {path: 'employee', loadChildren:employeeModule},
    {path: 'patron', loadChildren:patronModule},

    //If no actual path
    {path: '**', redirectTo: '' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}