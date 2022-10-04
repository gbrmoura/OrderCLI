import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MethodPaymentComponent } from './method-payment.component';

const routes: Routes = [{ path: '', component: MethodPaymentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MethodPaymentRoutingModule { }
