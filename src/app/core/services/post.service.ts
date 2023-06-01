import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment.development';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private readonly socket: Socket,
    private readonly httpClient: HttpClient
  ) {}

  public approved(id: string | null, data: any): Observable<any> {
    try {
      return this.httpClient.patch(`${environment.apiUrl}/post/${id}`, data);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public count(): Observable<any> {
    try {
      return this.httpClient.get(`${environment.apiUrl}/post/count`);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public getAll(): Observable<any> {
    try {
      return this.httpClient.get(`${environment.apiUrl}/post/admin`);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }

  public getOne(id: string): Observable<any> {
    try {
      return this.httpClient.get(`${environment.apiUrl}/post/${id}`);
    } catch (error) {
      throw new Error((error as any).message);
    }
  }
}
