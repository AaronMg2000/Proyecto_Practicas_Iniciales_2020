import { Component, OnInit } from '@angular/core';
import { UsuariosService} from '../../services/usuarios.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor(private usuariosService: UsuariosService) { }

  usuarios: any = [];

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe(
      res => {
        this.usuarios = res;
      },
      err => console.error(err)
    );
  }
}
