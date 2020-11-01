import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../../services/usuarios.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

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
