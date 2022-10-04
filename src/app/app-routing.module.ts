import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstRegisterComponent } from './pages/first-register/first-register.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { FormGetMailComponent } from './pages/forget-password/components/form-get-mail/form-get-mail.component';
import { FormGetPasswordComponent } from './pages/forget-password/components/form-get-password/form-get-password.component';

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
  {
    path: 'password',
    component: ForgetPasswordComponent,
    canActivate: [AuthGuard],
    data: {
      hideSideBar: true
    },
    children: [
      {
        path: 'forget',
        component: FormGetMailComponent,
      },
      {
        path: 'change',
        component: FormGetPasswordComponent
      }
    ]
  },

  // ? Layzloader Routers
  {
    path: 'register/users',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'register/category',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule)
  },
  {
    path: 'register/product',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'register/methodPayment',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/method-payment/method-payment.module').then(m => m.MethodPaymentModule)
  },
  {
    path: 'register/inventory',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/inventory/inventory.module').then(m => m.InventoryModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/dashboard-master/dashboard-master.module').then(m => m.DashboardMasterModule)
  },
  {
    path: 'menu',
    canActivate: [AuthGuard],
    data: {
      hideSideBar: true
    },
    loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuModule)
  },
  {
    path: 'shopping',
    canActivate: [AuthGuard],
    data: {
      hideSideBar: true
    },
    loadChildren: () => import('./pages/shopping/shopping.module').then(m => m.ShoppingModule)
  },
  {
    path: 'shopping/checkout',
    canActivate: [AuthGuard],
    data: {
      hideSideBar: true
    },
    loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule)
  },
  {
    path: 'order/user',
    canActivate: [AuthGuard],
    data: {
      hideSideBar: true
    },
    loadChildren: () => import('./pages/order-user/order-user.module').then(m => m.OrderUserModule)
  },
  {
    path: 'order/worker',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/order-worker/order-worker.module').then(m => m.OrderWorkerModule)
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
