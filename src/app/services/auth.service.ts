import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient, private socketService: SocketService) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      map((response: any) => {
        if (response && response.token) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.socketService.connect(); // Conectar al socket después de iniciar sesión
          this.socketService.emitEvent('userLoggedIn', response.user); // Emitir evento de usuario autenticado
        }
        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.socketService.emitEvent('userLoggedOut', this.getCurrentUser()); // Emitir evento de usuario desconectado
    this.socketService.disconnect(); // Desconectar del socket al cerrar sesión
  }

  get currentUserValue(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  getCurrentUser(): any {
    return this.currentUserValue.user;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}
