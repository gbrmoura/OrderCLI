import { GlobalModule } from './../global.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardMasterRoutingModule } from './dashboard-master-routing.module';
import { DashboardMasterComponent } from './dashboard-master.component';
import { CardMasterComponent } from './card-master/card-master.component';


@NgModule({
  declarations: [
    DashboardMasterComponent,
    CardMasterComponent
  ],
  imports: [
    CommonModule,
    DashboardMasterRoutingModule,
    GlobalModule
  ]
})
export class DashboardMasterModule { }
