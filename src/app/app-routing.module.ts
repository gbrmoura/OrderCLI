import { UserComponent } from './user/user.component';
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
  {
    path: 'register',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: {
      hideSideBar: true
    }
  },

  // ? Layzloader Routers
  {
    path: 'register/users',
    canActivate: [AuthGuard],
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'register/category',
    canActivate: [AuthGuard],
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
  },
  {
    path: 'register/product',
    canActivate: [AuthGuard],
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'register/methodPayment',
    canActivate: [AuthGuard],
    loadChildren: () => import('./method-payment/method-payment.module').then(m => m.MethodPaymentModule)
  },
  {
    path: 'register/inventory',
    canActivate: [AuthGuard],
    loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard-master/dashboard-master.module').then(m => m.DashboardMasterModule)
  },
  {
    path: 'menu',
    canActivate: [AuthGuard],
    // data: {
    //   hideSideBar: true
    // },
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule)
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
