import { Component, HostBinding, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import {UsuariosService} from '../../services/usuarios.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  @HostBinding('class') classes = 'row';
  reg: any = false;
  usuario: Usuario = {
    Carne: '',
    Nombres: '',
    Apellido: '',
    Password: '',
    Confirmar: '',
    Correo: ''
  };

  constructor(
    public usuarioService: UsuariosService,
    private router: Router
    ) { }

  ngOnInit(): void {}

  comprobarUsuario(carne): any{
    this.usuarioService.getUsuario(carne).subscribe(
      res => {
        this.reg = false;
      },
      err => {
        this.reg = true;
      }
    );
    console.log(this.reg);
  }

  CrearUsuario(): any{
    this.usuarioService.registrar(this.usuario)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('Carne', this.usuario.Carne);
        this.router.navigate(['/Inicio']);
      },
      err => console.log(err)
    )
  }
}
