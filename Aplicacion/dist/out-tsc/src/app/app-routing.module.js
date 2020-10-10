import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InicioComponent } from './Components/inicio/inicio.component';
import { LoginComponent } from './Components/login/login.component';
import { Page404Component } from './Components/page404/page404.component';
import { PensumComponent } from './Components/pensum/pensum.component';
import { PublicacionComponent } from './Components/publicacion/publicacion.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { RestablecerComponent } from './Components/restablecer/restablecer.component';
import { UsuarioComponent } from './Components/usuario/usuario.component';
const routes = [
    { path: '', component: LoginComponent },
    { path: 'Inicio', component: InicioComponent },
    { path: 'Registro', component: RegistroComponent },
    { path: 'Pensum/:id', component: PensumComponent },
    { path: 'Usuario/:id', component: UsuarioComponent },
    { path: 'Restablecer', component: RestablecerComponent },
    { path: 'Publicacion/:id', component: PublicacionComponent },
    { path: 'Perfil/:id', component: UsuarioComponent },
    { path: '**', component: Page404Component }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map