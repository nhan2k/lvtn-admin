import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PostManageComponent } from './pages/post-manage/post-manage.component';
import { AccountsManageComponent } from './pages/accounts-manage/accounts-manage.component';
import { LoginComponent } from './pages/login/login.component';
import { NonAuthLayoutComponent } from '@shared/components/non-auth-layout/non-auth-layout.component';
import { AuthLayoutComponent } from '@shared/components/auth-layout/auth-layout.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { PaymentComponent } from './pages/payment/payment.component';

const routes: Routes = [
  {
    path: '',
    component: NonAuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'posts',
        component: PostManageComponent,
      },
      {
        path: 'post-detail',
        component: PostDetailComponent,
      },
      {
        path: 'accounts',
        component: AccountsManageComponent,
      },
      {
        path: 'payments',
        component: PaymentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
