import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth'; // Mantén esta URL comentada si no usas backend real
  private readonly defaultEmail = 'admin@example.com';
  private readonly defaultPassword = 'admin123';

  constructor(private http: HttpClient, private socketService: SocketService) { }

  register(user: any): Observable<any> {
    // Lógica original para el registro, la dejamos comentada
    // return this.http.post(`${this.apiUrl}/register`, user);
    return of({ message: 'Registro deshabilitado en esta versión' });
  }

  login(user: any): Observable<any> {
    // Lógica añadida para el entorno sin backend (Vercel)
    if (user.email === this.defaultEmail && user.password === this.defaultPassword) {
      const response = {
        user: { email: this.defaultEmail, name: 'Admin' },
        token: 'fake-jwt-token'
      };
      localStorage.setItem('currentUser', JSON.stringify(response));
      this.socketService.connect();
      this.socketService.emitEvent('userLoggedIn', response.user);
      return of(response); // Usar `of` para simular un Observable
    }

    // Devuelve un Observable con error si las credenciales son incorrectas
    return of({ error: 'Credenciales incorrectas' });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.socketService.emitEvent('userLoggedOut', this.getCurrentUser());
    this.socketService.disconnect();
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
