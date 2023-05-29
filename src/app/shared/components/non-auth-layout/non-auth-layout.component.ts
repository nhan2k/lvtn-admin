import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-non-auth-layout',
  templateUrl: './non-auth-layout.component.html',
  styleUrls: ['./non-auth-layout.component.scss'],
})
export class NonAuthLayoutComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}
  ngOnInit(): void {
    const isLoggin = this.authService.getToken();

    if (isLoggin) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
