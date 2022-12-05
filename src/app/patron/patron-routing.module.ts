import { NgModule } from "@angular/core";
import { HomeComponent } from "./home";
import { LayoutComponent } from "./layout";
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: HomeComponent},

            //If no actual path
            {path: '**', redirectTo: '' }
        ],
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PatronRoutingModule {}