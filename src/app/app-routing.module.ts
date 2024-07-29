import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForumComponent } from './components/forum/forum.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'forum', component: ForumComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/header', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', component: HeaderComponent } // Manejo de rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
