import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITokens } from '@core/interfaces/shared/auth';
import { environment } from '@environment/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  storeToken(tokens: { access_token: string; refresh_token: string }) {
    sessionStorage.setItem('access_token', tokens.access_token);
    sessionStorage.setItem('refresh_token', tokens.refresh_token);
  }

  getToken() {
    return sessionStorage.getItem('access_token');
  }

  logout() {
    sessionStorage.clear();
  }

  login(credentials?: {
    phoneNumber?: string;
    password?: string;
  }): Observable<any> {
    try {
      return this.httpClient.post(
        `${environment.apiUrl}/user/login`,
        credentials
      );
    } catch (error) {
      throw new Error((error as any).message);
    }
  }
}
