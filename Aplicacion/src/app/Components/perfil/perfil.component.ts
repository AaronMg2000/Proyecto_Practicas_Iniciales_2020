import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import {UsuariosService} from '../../services/usuarios.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario = {
    Carne: '',
    Nombres: '',
    Apellido: '',
    Correo: '',
    Password: '',
    Confirmar: ''
  };
  password: any = '';
  constructor(public usuarioService: UsuariosService) { }

  ngOnInit(): void {
    const carne = this.usuarioService.getCarne();
    this.usuarioService.getUsuario(carne).subscribe(
      res => {
        this.usuario = res;
        this.password = this.usuario.Password;
        this.usuario.Password = '';
      },
      err => console.error(err)
    );
  }

  Actualizar(): any {
    if (this.usuario.Password === ''){
      this.usuario.Password = this.password;
      console.log(this.usuario.Password);
    }
    this.usuarioService.update(this.usuario.Carne, this.usuario).subscribe(
      res => {
        console.log('Usuario Actualizado');
      },
      err => console.log(err)
    )
  }

}
