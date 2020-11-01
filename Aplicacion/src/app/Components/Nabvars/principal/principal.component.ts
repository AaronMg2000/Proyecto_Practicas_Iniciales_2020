import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../../services/usuarios.service';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(public usuarioService: UsuariosService) { }

  ngOnInit(): void {
  }

}
