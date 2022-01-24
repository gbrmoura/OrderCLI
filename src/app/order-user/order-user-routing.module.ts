import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderUserComponent } from './order-user.component';

const routes: Routes = [{ path: '', component: OrderUserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderUserRoutingModule { }
