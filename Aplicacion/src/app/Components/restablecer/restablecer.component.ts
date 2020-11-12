import { Component, HostBinding, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import {UsuariosService} from '../../services/usuarios.service';
import {Router} from '@angular/router';
import * as alertify from 'alertifyjs';
declare let $: any;
@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.component.html',
  styleUrls: ['./restablecer.component.css']
})
export class RestablecerComponent implements OnInit {

  @HostBinding('class') classes = 'row';
  reg: any = true;
  usuario: Usuario = {
    Carne: '',
    Nombres: '',
    Apellido: '',
    Correo: '',
    Password: '',
    Confirmar: ''
  };

  user: Usuario = {
    Carne: '',
    Nombres: '',
    Apellido: '',
    Correo: '',
    Password: '',
    Confirmar: ''
  };

  error: any = '';
  mostrar: any = false;
  constructor(
    public usuarioService: UsuariosService,
    private router: Router
    ) { }

  ngOnInit(): void {
    const carne = this.usuarioService.getCarne();
    if (carne != null){
      this.router.navigate(['/Inicio']);
    }
  }

  ConfirmarDatos(): any{
    this.usuarioService.getUsuario(this.usuario.Carne)
    .subscribe(
      res => {
        this.user = res;
        this.error = '';
        this.mostrar = false;
        console.log('entre1');
        if (!this.mostrar){
          if (this.user.Correo.toUpperCase() !== this.usuario.Correo.toUpperCase()){
            console.log('entre');
            this.error = 'Correo Electronico incorrecto';
            this.mostrar = true;
          }else{
            this.usuario = this.user;
            this.usuario.Confirmar = '';
            this.usuario.Password = '';
            $('#CambiarContraseña').modal('show');
          }
        }else{
          this.mostrar = true;
        }
      },
      err => {
        this.error = err.error.text;
        this.mostrar = true;
      }
    );
  }
  ActualizarUsuario(): any{
    console.log(this.usuario);
    this.usuarioService.update(this.usuario.Carne, this.usuario).subscribe(
      res => {
        console.log('Usuario Actualizado');
        $('#CambiarContraseña').modal('hide');
        this.usuario.Carne = '';
        this.usuario.Nombres = '';
        this.usuario.Apellido = '';
        this.usuario.Confirmar = '';
        this.usuario.Password = '';
        this.usuario.Correo = '';
        alertify.success('Contraseña actualizada con exito');
      },
      err => {console.log(err); alertify.success('error al actualizar la contraseña'); }
    );
  }
}
