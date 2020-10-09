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

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'Inicio', component: InicioComponent},
  {path: 'Registro', component: RegistroComponent},
  {path: 'Pensum/:id', component: PensumComponent},
  {path: 'Usuario/:id', component: UsuarioComponent},
  {path: 'Restablecer', component: RestablecerComponent},
  {path: 'Publicacion/:id', component: PublicacionComponent},
  {path: 'Perfil/:id', component: UsuarioComponent},
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
