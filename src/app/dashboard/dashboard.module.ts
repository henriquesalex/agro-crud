import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoFlexyModule } from '../demo-flexy-module'
import { DashboardComponent } from './dashboard.component';
import { FarmGraphComponent } from './dashboard-components/farm-graph/farm-graph.component';
import { ActivityComponent } from './dashboard-components/activity/activity.component';
import { ProductComponent } from './dashboard-components/product/product.component';
import { CardsComponent } from './dashboard-components/cards/cards.component';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';




@NgModule({
  declarations: [
    DashboardComponent,
    FarmGraphComponent,
    ActivityComponent,
    ProductComponent,
    CardsComponent,
  ],
  imports: [
    CommonModule,
    DemoFlexyModule,
    FormsModule,
    NgApexchartsModule,
    
  ],
  exports: [
    DashboardComponent,
    FarmGraphComponent,
    ActivityComponent,
    ProductComponent,
  ]
})
export class DashboardModule { }
