import { GlobalModule } from '../global.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderWorkerRoutingModule } from './order-worker-routing.module';
import { OrderWorkerComponent } from './order-worker.component';


@NgModule({
  declarations: [
    OrderWorkerComponent
  ],
  imports: [
    CommonModule,
    OrderWorkerRoutingModule,
    GlobalModule
  ]
})
export class OrderWorkerModule { }
