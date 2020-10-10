import { __decorate } from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
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
            PrincipalComponent
        ],
        imports: [
            BrowserModule,
            AppRoutingModule
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map