import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsComponent } from './forms/forms.component';
import { DemoFlexyModule } from '../demo-flexy-module';
import { FormsModule } from '@angular/forms';
import { FarmListComponent } from './farm-list/farm-list.component';
import { FarmDetailsComponent } from './farm-details/farm-details.component';


@NgModule({
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    FormsComponent,
    FormsModule,
    FarmListComponent,
    FarmDetailsComponent
  ],
  exports: [
    FormsComponent,
  ]
})
export class ComponentsModule { }
