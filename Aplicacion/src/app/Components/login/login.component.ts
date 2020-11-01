import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import {UsuariosService} from '../../services/usuarios.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = {
    Carne: '',
    Nombres: '',
    Apellido: '',
    Password: '',
    Confirmar: '',
    Correo: ''
  };

  constructor(
    private usuarioService: UsuariosService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }
  onLogin(){
    return this.usuarioService.login(this.usuario)
    .subscribe(
      res =>{
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/Inicio']);
      },
      err => console.log(err)
    );
  }
}
