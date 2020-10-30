import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import {UsuariosService} from '../../services/usuarios.service';

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

  constructor(private usuarioService: UsuariosService) { }

  ngOnInit(): void {
  }
  onLogin(){
    return this.usuarioService.login(this.usuario.Carne, this.usuario.Password)
    .subscribe(
      data =>{
        console.log(data);
      },
      res => console.log(res)
    );
  }
}
