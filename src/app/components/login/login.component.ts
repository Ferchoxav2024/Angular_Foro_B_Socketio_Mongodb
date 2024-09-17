import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
  // Credenciales predeterminadas
  private readonly defaultEmail = 'admin@example.com';
  private readonly defaultPassword = 'admin123';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: [this.defaultEmail, [Validators.required, Validators.email]],
      password: [this.defaultPassword, Validators.required]
    });
  }

  ngOnInit(): void {
    // Puedes dejar este método vacío si no necesitas hacer nada adicional al iniciar
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    // El `AuthService` ya maneja el caso de credenciales predeterminadas
    this.authService.login(user).subscribe(
      res => {
        // Redirigir a la página deseada después de un login exitoso
        this.router.navigate(['/forum']);
      },
      err => {
        console.error('Error al iniciar sesión', err);
        // Mostrar un mensaje de error o manejar el error según tu lógica
        alert('Error: credenciales incorrectas o fallo en el login');
      }
    );
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
