import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  // Variable para activar el modo texto
  useTextMode: boolean = false; // Cambia esto a `true` para el modo texto

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Establecer valores predeterminados
    this.loginForm.patchValue({
      email: 'admin@example.com',
      password: 'admin'
    });
  }

  onLogin(): void {
    if (this.useTextMode) {
      // Modo texto: redirige directamente sin validación
      this.router.navigate(['/forum']);
      return;
    }

    // Modo normal: valida y luego redirige
    if (this.loginForm.invalid) {
      return;
    }

    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.authService.login(user).subscribe(
      res => {
        this.router.navigate(['/forum']);
      },
      err => {
        console.error(err);
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
