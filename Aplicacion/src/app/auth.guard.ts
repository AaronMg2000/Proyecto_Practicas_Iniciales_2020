import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { from, Observable } from 'rxjs';
import {UsuariosService} from './services/usuarios.service';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UsuariosService,
    private router: Router
    ){}
  canActivate(): boolean{
    if(this.userService.loggedIN()){
      return true;
    }
    else
    {
      this.router.navigate(['/Login']);
      return false;
    }
  }

}
