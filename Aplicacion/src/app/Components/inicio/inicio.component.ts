import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(public usuarioService: UsuariosService) { }

  ngOnInit(): void {}

}
