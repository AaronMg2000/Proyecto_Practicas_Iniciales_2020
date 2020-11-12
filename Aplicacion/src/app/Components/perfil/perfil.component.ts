import { ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnDestroy, OnInit {

  creditos: any = 0;

  usuario: Usuario = {
    Carne: '',
    Nombres: '',
    Apellido: '',
    Correo: '',
    Password: '',
    Confirmar: ''
  };

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dteElement: DataTableDirective;

  cursoAP: CursoA = {
    CarnetU: '',
    CursoP: 0,
    NotaAprobada: 61
  };
  cursos: any = [];
  cursosAprobados: any = [];
  password: any = '';
  constructor(
    public usuarioService: UsuariosService,
    public cursosapService: CursosAprobadosService,
    public cursoService: CursosService,
    private chRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dtOptions = {
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      }
    };
    const carne = this.usuarioService.getCarne();
    this.cursoAP.CarnetU = carne;
    this.cursosapService.getCursos(carne).subscribe(
      res => {
        this.cursosAprobados = res;
        this.chRef.detectChanges();

        this.dtTrigger.next();
        this.obtenerCreditos();
      },
      err => console.log(err)
    );
    this.cursoService.getListaCurso(carne).subscribe(
      res => {
        this.cursos = res;
        $('#CursoP').select2();
        $('#CursoP').val('').trigger('change.select2');
      },
      err => console.log(err)
    );

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

  Actualizar(): any {
    if (this.usuario.Password === ''){
      this.usuario.Password = this.password;
    }
    this.usuarioService.update(this.usuario.Carne, this.usuario).subscribe(
      res => {
        console.log('Usuario Actualizado');
        alertify.success('Usuario actualizado con exito');
        this.usuario.Password = '';
        this.usuario.Confirmar = '';
      },
      err => {console.log(err); alertify.success('Error al actualizar el usuario'); }
    );
  }

  AgregarCursoA(): any {
    this.cursoAP.CursoP = $('#CursoP').val();
    if ( this.cursoAP.CursoP != null && this.cursoAP.CursoP !== 0 ){
      this.cursosapService.registrar(this.cursoAP).subscribe(
        res => {
          this.cursoService.getListaCurso(this.usuario.Carne).subscribe(
            res2 => {
              this.cursos = res2;
              this.cursosapService.getCursos(this.usuario.Carne).subscribe(
                res3 => {
                  this.cursosAprobados = res3;

                  this.obtenerCreditos();
                  $('#CursoP').val('').trigger('change.select2');
                  this.cursoAP.NotaAprobada = 61;
                },
                err3 => {console.log(err3); }
              );
              this.rerender();
              alertify.success('Curso registrado con exito');
            },
            err2 => console.log(err2)
          );

        },
        err => alertify.error('Error al registrar el Curso')
      );
    }
    else{
      alertify.error('Error al registrar el Curso');
    }
  }

  obtenerCreditos(): any{
    this.creditos = 0;
    this.cursosAprobados.forEach(element => {
      this.creditos += element.Creditos;
    });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dteElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
}
