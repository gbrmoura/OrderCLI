import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardMasterComponent } from './dashboard-master.component';

const routes: Routes = [{ path: '', component: DashboardMasterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardMasterRoutingModule { }
