import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './features/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from '@features/sidebar/sidebar.component';
import { PostManageComponent } from './pages/post-manage/post-manage.component';
import { AccountsManageComponent } from './pages/accounts-manage/accounts-manage.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { LoginComponent } from './pages/login/login.component';
import { CoreModule } from '@core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutComponent } from './shared/components/auth-layout/auth-layout.component';
import { NonAuthLayoutComponent } from './shared/components/non-auth-layout/non-auth-layout.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { MatPaginatorModule } from '@angular/material/paginator';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    SidebarComponent,
    PostManageComponent,
    AccountsManageComponent,
    LoadingComponent,
    LoginComponent,
    AuthLayoutComponent,
    NonAuthLayoutComponent,
    PostDetailComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    SocketIoModule.forRoot(config),
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
