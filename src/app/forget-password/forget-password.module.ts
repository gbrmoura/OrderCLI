import { GlobalModule } from './../global.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormGetPasswordComponent } from './components/form-get-password/form-get-password.component';
import { ForgetPasswordComponent } from './forget-password.component';
import { FormGetMailComponent } from './components/form-get-mail/form-get-mail.component';

@NgModule({
  declarations: [
    ForgetPasswordComponent,
    FormGetPasswordComponent,
    FormGetMailComponent
  ],
  imports: [
    CommonModule,
    ForgetPasswordComponent,
    GlobalModule
  ]
})
export class ForgetPasswordModule { }
