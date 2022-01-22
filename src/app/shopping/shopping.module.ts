import { GlobalModule } from './../global.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingComponent } from './shopping.component';

@NgModule({
  declarations: [
    ShoppingComponent,
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    GlobalModule
  ]
})
export class ShoppingModule { }
