import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { LayoutComponent } from './layout';
import { LoginComponent } from './login';
import { RegisterComponent } from './register/register.component';
import { ReservationComponent } from './reservation/reservation.compnent';
const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: HomeComponent},
            { path: 'login', component: LoginComponent},
            { path: 'register', component: RegisterComponent},
            { path: 'reservation', component: ReservationComponent}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DefaultRoutingModule{}