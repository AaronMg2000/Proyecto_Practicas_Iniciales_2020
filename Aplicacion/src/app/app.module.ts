import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTablesModule } from 'angular-datatables';
import { LoginComponent } from './Components/login/login.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { PensumComponent } from './Components/pensum/pensum.component';
import { PerfilComponent } from './Components/perfil/perfil.component';
import { PublicacionComponent } from './Components/publicacion/publicacion.component';
import { Page404Component } from './Components/page404/page404.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { RestablecerComponent } from './Components/restablecer/restablecer.component';
import { UsuarioComponent } from './Components/usuario/usuario.component';
import { PrincipalComponent } from './Components/Nabvars/principal/principal.component';
import { UsuariosService} from './services/usuarios.service';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AuthGuard} from './auth.guard';
import {TokenInterceptorService} from './services/token-interceptor.service';
import { PasswordValidationDirective } from './validations/password-validation.directive';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    PensumComponent,
    PerfilComponent,
    PublicacionComponent,
    Page404Component,
    RegistroComponent,
    RestablecerComponent,
    UsuarioComponent,
    PrincipalComponent,
    PasswordValidationDirective
  ],
  imports: [
    BrowserModule,
    NgSelect2Module,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [
    UsuariosService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
