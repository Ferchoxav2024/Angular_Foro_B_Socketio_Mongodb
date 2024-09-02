import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Eliminar la importación de AuthService
// import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, 
              // Eliminar AuthService de los parámetros del constructor
              // private authService: AuthService, 
              private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    // Definir correo y contraseña predefinidos
    const predefinedEmail = 'admin@example.com';
    const predefinedPassword = 'admin123';

    // Verificar si el usuario ingresa las credenciales predefinidas
    if (user.email === predefinedEmail && user.password === predefinedPassword) {
      // Redirigir al usuario a la interfaz deseada si las credenciales son correctas
      this.router.navigate(['/forum']);
    } else {
      // Manejar el caso de credenciales incorrectas o no predefinidas
      console.error('Credenciales incorrectas');
      // Opcional: Mostrar un mensaje de error al usuario
    }

    // Eliminar el uso de authService
    // this.authService.login(user).subscribe(
    //   res => {
    //     this.router.navigate(['/forum']);
    //   },
    //   err => {
    //     console.error(err);
    //   }
    // );
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
