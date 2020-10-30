import { Component, HostBinding, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import {UsuariosService} from '../../services/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  usuario: Usuario = {
    Carne: '',
    Nombres: '',
    Apellido: '',
    Password: '',
    Confirmar: '',
    Correo: ''
  };

  constructor(private usuarioService: UsuariosService) { }

  ngOnInit(): void {}

  CrearUsuario(){
    this.usuarioService.registrar(this.usuario)
    .subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    )
  }
}
