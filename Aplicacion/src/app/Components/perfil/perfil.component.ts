import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: any = [];

  constructor(public usuarioService: UsuariosService) { }

  ngOnInit(): void {
    const carne = this.usuarioService.getCarne();
    this.usuarioService.getUsuario(carne).subscribe(
      res => {
        this.usuario = res;
      },
      err => console.error(err)
    );
  }

}
