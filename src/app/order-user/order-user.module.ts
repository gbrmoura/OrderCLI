import { GlobalModule } from '../global.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderUserRoutingModule } from './order-user-routing.module';
import { OrderUserComponent } from './order-user.component';


@NgModule({
  declarations: [
    OrderUserComponent
  ],
  imports: [
    CommonModule,
    OrderUserRoutingModule,
    GlobalModule
  ]
})
export class OrderUserModule { }
