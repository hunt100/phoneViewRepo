import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyFirstComponentComponent } from './my-first-component/my-first-component.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PhoneDetailComponent } from './phone-detail/phone-detail.component';


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'phones', component: MyFirstComponentComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:id', component: PhoneDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
