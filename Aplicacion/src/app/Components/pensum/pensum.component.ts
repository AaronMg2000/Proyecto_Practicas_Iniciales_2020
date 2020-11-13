import { ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Pensum } from 'src/app/models/Pensum';
import { Usuario } from 'src/app/models/usuario';

import { Curso } from 'src/app/models/Curso';
import { CursoA } from 'src/app/models/CursoAprobado';
import * as alertify from 'alertifyjs';

import {UsuariosService} from '../../services/usuarios.service';
import {CursosAprobadosService} from '../../services/cursos-aprobados.service';
import {CursosService} from '../../services/cursos.service';

import {Router} from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
declare let $: any;

@Component({
  selector: 'app-pensum',
  templateUrl: './pensum.component.html',
  styleUrls: ['./pensum.component.css']
})
export class PensumComponent implements OnInit {

  creditos: any = 0;

  usuario: Usuario = {
    Carne: '',
    Nombres: '',
    Apellido: '',
    Correo: '',
    Password: '',
    Confirmar: ''
  };
  pensum: Pensum = {
    CodigoCurso: 0,
    Creditos: 0,
    IdCursoPensum: 0,
    Nombre: '',
    Semestre: 0
  };

  cursos: Pensum[] = [];
  password: any = '';
  constructor(
    public usuarioService: UsuariosService,
    public cursosapService: CursosAprobadosService,
    public cursoService: CursosService,
    private chRef: ChangeDetectorRef) { }

  ngOnInit(): void {

    const carne = this.usuarioService.getCarne();
    this.usuarioService.getUsuario(carne).subscribe(
      res => {
        this.usuario = res;
        this.password = this.usuario.Password;
        this.usuario.Password = '';
        this.usuario.Confirmar = '';
      },
      err => console.error(err)
    );
  }

  obtenerPensum(semestre: number): void{
    this.cursoService.getListaSemestre(this.usuario.Carne, semestre).subscribe(
      res => {
        this.cursos = res;
        console.log(this.cursos);
      },
      err => { console.error(err); alertify.error('Error al cargar cursos'); }
    );
  }

}
