import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './Components/inicio/inicio.component';
import { LoginComponent } from './Components/login/login.component';
import { Page404Component } from './Components/page404/page404.component';
import { PensumComponent } from './Components/pensum/pensum.component';
import { PublicacionComponent } from './Components/publicacion/publicacion.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { RestablecerComponent } from './Components/restablecer/restablecer.component';
import { UsuarioComponent } from './Components/usuario/usuario.component';
import {AuthGuard} from '././auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/Login',
    pathMatch: 'full'
  },
  {path: 'Login', component: LoginComponent},
  {path: 'Inicio', component: InicioComponent, canActivate: [AuthGuard]},
  {path: 'Registro', component: RegistroComponent},
  {path: 'Pensum/:id', component: PensumComponent, canActivate: [AuthGuard]},
  {path: 'Usuario/:id', component: UsuarioComponent, canActivate: [AuthGuard]},
  {path: 'Restablecer', component: RestablecerComponent, canActivate: [AuthGuard]},
  {path: 'Publicacion/:id', component: PublicacionComponent, canActivate: [AuthGuard]},
  {path: 'Perfil', component: UsuarioComponent, canActivate: [AuthGuard]},
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
