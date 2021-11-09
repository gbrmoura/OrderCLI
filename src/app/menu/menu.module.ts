import { GlobalModule } from './../global.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { ItemComponent } from './components/item/item.component';


@NgModule({
  declarations: [
    MenuComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    GlobalModule
  ]
})
export class MenuModule { }
