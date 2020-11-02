import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import {UsuariosService} from '../../services/usuarios.service';
import {Router} from '@angular/router';
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
  error: any = '';
  mostrar: any = false;
  constructor(
    private usuarioService: UsuariosService,
    private router: Router
    ) { }

  ngOnInit(): void {
    const carne = this.usuarioService.getCarne();
    if (carne != null){
      this.router.navigate(['/Inicio']);
    }
  }

  onLogin(): any{
    return this.usuarioService.login(this.usuario)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('Carne', this.usuario.Carne);
        this.error = '';
        this.mostrar = false;
        this.router.navigate(['/Inicio']);
      },
      err => {
        this.error = err.error;
        this.mostrar = true;
      }
    );
  }
}
