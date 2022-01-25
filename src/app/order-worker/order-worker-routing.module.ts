import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderWorkerComponent } from './order-worker.component';

const routes: Routes = [{ path: '', component: OrderWorkerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderWorkerRoutingModule { }
