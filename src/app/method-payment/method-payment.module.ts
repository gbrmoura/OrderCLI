import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MethodPaymentRoutingModule } from './method-payment-routing.module';
import { MethodPaymentComponent } from './method-payment.component';
import { GlobalModule } from '../global.module';


@NgModule({
  declarations: [
    MethodPaymentComponent
  ],
  imports: [
    CommonModule,
    MethodPaymentRoutingModule,
    GlobalModule
  ]
})
export class MethodPaymentModule { }
