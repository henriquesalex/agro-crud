import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './components/forms/forms.component';
import { ProductComponent } from './dashboard/dashboard-components/product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { FarmListComponent } from './components/farm-list/farm-list.component';
import { FarmDetailsComponent } from './components/farm-details/farm-details.component';

const routes: Routes = [
  {
    path:"",
    component:FullComponent,
    children: [
      {path:"", redirectTo:"/home", pathMatch:"full"},
      {path:"home", component:DashboardComponent},
      {path:"forms", component:FormsComponent},
      {path:"table", component:ProductComponent},
      {path: 'farms', component: FarmListComponent},
      {path: 'farm-details/:id', component: FarmDetailsComponent},
    ]    
  },

  {path:"", redirectTo:"/home", pathMatch:"full"},
  {path:"**", redirectTo:"/home", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
