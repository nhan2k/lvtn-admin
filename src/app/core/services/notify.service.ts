import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(
    private socket: Socket,
    private readonly httpClient: HttpClient
  ) {}

  sendNotify(msg: string) {
    this.socket.emit('sendNotify', JSON.stringify({ message: 'sendNotify' }));
  }
  getNotify() {
    // this.socket.on('notifyReceive', (data: string) => {});
  }
}
