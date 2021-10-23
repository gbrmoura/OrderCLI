import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstRegisterComponent } from './first-register/first-register.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // ? Components Routers
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: {
      hideSideBar: true
    }
  },
  {
    path: 'firstRegister',
    component: FirstRegisterComponent,
    canActivate: [AuthGuard],
    data: {
      hideSideBar: true
    }
  },

  // ? Layzloader Routers
  {
    path: 'crud/:screen',
    canActivate: [AuthGuard],
    loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule)
  },

  // ? Redirect
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
