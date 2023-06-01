import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { ITokens } from '@core/interfaces/shared/auth';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@core/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    phoneNumber: '',
    password: '',
  });

  constructor(
    private readonly router: Router,
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly toastrService: ToastrService,
    private readonly loadingService: LoadingService
  ) {}

  onSubmit(): void {
    try {
      const credentials = {
        phoneNumber: this.loginForm.value.phoneNumber || undefined,
        password: this.loginForm.value.password || undefined,
      };
      this.authService.login(credentials).subscribe(
        (response) => {
          if (response.role !== 'admin') {
            this.toastrService.error('Đăng nhập thất bại');
          } else {
            this.authService.storeToken(response as ITokens);
            this.router.navigate(['/dashboard']);
            this.toastrService.success('Đăng nhập thành công');
          }
        },
        (error) => {
          this.toastrService.error('Đã có lỗi xảy ra vui lòng thử lại');
          this.loadingService.setLoading(false);
        }
      );
    } catch (error) {
      throw new Error((error as any).message);
    }
  }
}
