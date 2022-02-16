import { GlobalModule } from './global.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FirstRegisterComponent } from './first-register/first-register.component';
import { UserComponent } from './user/user.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { FormGetPasswordComponent } from './forget-password/components/form-get-password/form-get-password.component';
import { FormGetMailComponent } from './forget-password/components/form-get-mail/form-get-mail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FirstRegisterComponent,
    UserComponent,
    FormGetPasswordComponent,
    FormGetMailComponent,
    ForgetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GlobalModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
