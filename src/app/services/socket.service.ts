import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:5000');
    this.socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });
    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });
  }

  public onEvent(event: string): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(event, (data) => observer.next(data));
    });
  }

  public emitEvent(event: string, data: any): void {
    this.socket.emit(event, data);
  }

  public disconnect(): void {
    this.socket.disconnect();
  }

  public connect(): void {
    this.socket.connect();
  }
}
