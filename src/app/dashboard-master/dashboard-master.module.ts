import { GlobalModule } from './../global.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardMasterRoutingModule } from './dashboard-master-routing.module';
import { DashboardMasterComponent } from './dashboard-master.component';


@NgModule({
  declarations: [
    DashboardMasterComponent
  ],
  imports: [
    CommonModule,
    DashboardMasterRoutingModule,
    GlobalModule
  ]
})
export class DashboardMasterModule { }
