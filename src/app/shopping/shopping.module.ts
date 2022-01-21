import { GlobalModule } from './../global.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingComponent } from './shopping.component';
import { ShoppingItemComponent } from './components/shopping-item/shopping-item.component';

@NgModule({
  declarations: [
    ShoppingComponent,
    ShoppingItemComponent
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    GlobalModule
  ]
})
export class ShoppingModule { }
