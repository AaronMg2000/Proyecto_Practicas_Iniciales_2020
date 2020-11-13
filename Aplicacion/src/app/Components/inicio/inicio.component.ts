import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service';
import {ComentariosService} from '../../services/comentarios.service';
import {PublicacionService} from '../../services/publicacion.service';
import {AuxiliarService} from '../../services/auxiliar.service';
import {CatedraticoService} from '../../services/catedratico.service';
import {CursosService} from '../../services/cursos.service';
import {CursoCatedraticoService} from '../../services/curso-catedratico.service';
import * as alertify from 'alertifyjs';
declare let $: any;

import {Usuario} from '../../models/usuario';
import {Publicacion} from '../../models/Publicacion';
import {Comentario} from '../../models/Comentario';
import { Auxiliar } from 'src/app/models/Auxiliar';
import { Catedratico } from 'src/app/models/Catedratico';
import { Curso } from 'src/app/models/Curso';
import {CursoCatedratico} from 'src/app/models/CursoCatedratico';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

    usuario: Usuario = {
      Carne: '',
      Nombres: '',
      Apellido: '',
      Correo: '',
      Password: '',
      Confirmar: ''
    };

    comentar: any = false;

    editarC: any = false;

    editarP: any = false;
    crearP: any = false;
    auxiliar: Auxiliar = {
      NoAuxiliar: 0,
      Nombres: '',
      Apellidos: '',
    };
    catedratico: Catedratico = {
      NoCatedratico: 0,
      Nombres: '',
      Apellidos: '',
    };
    curso: Curso = {
      idCursoPensum: 0,
      CodigoCurso: 0,
      Nombre: ''
    };

    publicacion: Publicacion = {
      idPublicacion: 0,
      Mensaje: '',
      Usuario_Carnet: 0,
      Fecha_Date: new Date(),
      Curso_CodigoCurso: null,
      idCatedraticoCursoP: null,
      Catedratico_NoCatedratico: null,
      Auxiliar_NoAuxiliar: null,
      Tipo: null,
      NComentarios: 0,
      Comentarios: [],
      Usuario: this.usuario,
      auxiliar: this.auxiliar,
      catedratico: this.catedratico,
      curso: this.curso
    };

    publicacionNueva: Publicacion = {
      idPublicacion: 0,
      Mensaje: '',
      Usuario_Carnet: 0,
      Fecha_Date: new Date(),
      Curso_CodigoCurso: null,
      idCatedraticoCursoP: null,
      Catedratico_NoCatedratico: null,
      Auxiliar_NoAuxiliar: null,
      Tipo: null,
      NComentarios: 0,
      Comentarios: [],
      Usuario: this.usuario,
      auxiliar: this.auxiliar,
      catedratico: this.catedratico,
      curso: this.curso
    };

    publicacionNueva2: Publicacion = {
      idPublicacion: 0,
      Mensaje: '',
      Usuario_Carnet: 0,
      Fecha_Date: new Date(),
      Curso_CodigoCurso: null,
      idCatedraticoCursoP: null,
      Catedratico_NoCatedratico: null,
      Auxiliar_NoAuxiliar: null,
      Tipo: null,
      NComentarios: 0,
      Comentarios: [],
      Usuario: this.usuario,
      auxiliar: this.auxiliar,
      catedratico: this.catedratico,
      curso: this.curso
    };

    comentario: Comentario = {
      idComentario: null,
      Mensaje: '',
      Publicacion_id: 0,
      Usuario_Carnet: '',
      usuario: this.usuario,
      iniciales: ''
    };

    comentarioaux: Comentario = {
      idComentario: null,
      Mensaje: '',
      Publicacion_id: 0,
      Usuario_Carnet: '',
      usuario: this.usuario,
      iniciales: ''
    };

    comentarios: Comentario[] = [];
    publicaciones: Publicacion[] = [];
    cursos: Curso[] = [];
    auxiliares: Auxiliar[] = [];
    catedraticos: Catedratico[] = [];
    cursocatedraticos: CursoCatedratico[] = [];

  constructor(
      public usuarioService: UsuariosService,
      public publicacionService: PublicacionService,
      public auxiliarService: AuxiliarService,
      public comentarioService: ComentariosService,
      public cursosService: CursosService,
      public catedraticoService: CatedraticoService,
      public cursoCatedraticoService: CursoCatedraticoService
      ) { }

  ngOnInit(): void {
    const carne = this.usuarioService.getCarne();
    this.usuarioService.getUsuario(carne).subscribe(
      res => {
        this.usuario = res;
      },
      err => console.error(err)
    );
    this.obtenerPublicaciones();

    this.cursosService.getCursos().subscribe(
      res => {
        this.cursos = res;
      },
      err => console.log(err)
    );

    this.auxiliarService.getAuxiliares().subscribe(
      res => {
        this.auxiliares = res;
      },
      err => console.log(err)
    );

    this.catedraticoService.getCatedraticos().subscribe(
      res => {
        this.catedraticos = res;
      },
      err => console.error(err)
    );

    this.cursoCatedraticoService.getCursosCate().subscribe(
      res => {
        this.cursocatedraticos = res;
        this.cursocatedraticos.forEach(element => {
          this.cursosService.getCurso(element.Curso_CodigoCurso).subscribe(
            res2 => {
              element.curso = res2;
            },
            err2 => console.error(err2)
          );
          this.catedraticoService.getCatedratico(element.Catedratico_NoCatedratico).subscribe(
            res2 => {
              element.catedratico = res2;
            },
            err2 => console.error(err2)
          );
          this.auxiliarService.getAuxiliar(element.Auxiliar_NoAuxiliar).subscribe(
            res2 => {
              element.auxiliar = res2;
            },
            err2 => console.error(err2)
          );
        });
      },
      err => console.log(err)
    );
  }
  iniciarSelect(T: number): void{
    this.publicacionNueva.Tipo = T;
    setTimeout(() => {
      $('#SelectCurso').select2();
      $('#SelectAux').select2();
      $('#SelectCate').select2();
      $('#SelectCateCur').select2();
      $('#SelectCurso').val('').trigger('change.select2');
      $('#SelectAux').val('').trigger('change.select2');
      $('#SelectCate').val('').trigger('change.select2');
      $('#SelectCateCur').val('').trigger('change.select2');
    }, 50);
    this.publicacionNueva.Auxiliar_NoAuxiliar = null;
    this.publicacionNueva.Catedratico_NoCatedratico = null;
    this.publicacionNueva.Curso_CodigoCurso = null;
    this.publicacionNueva.idCatedraticoCursoP = null;
  }
  obtenerPublicaciones(): void{
    this.publicacionService.getPublicaciones().subscribe(
      res => {
        this.publicaciones = res;
        this.obtenerUsuario();
        this.obtenerAuxiliar();
        this.obtenerCurso();
        this.obtenerCatedratico();
        this.obtenerCursoCatedratico();
        this.CrearComentarios();
        console.log(this.publicaciones);
      },
      err => console.error(err)
    );
  }

  desactivar(): void{
    this.publicacionNueva.Tipo = null;
    this.publicacionNueva.Mensaje = '';
    $('#cursoCateR').prop('checked', false);
    $('#auxR').prop('checked', false);
    $('#cateR').prop('checked', false);
    $('#cursoR').prop('checked', false);
  }
  obtenerUsuario(): void{
    this.publicaciones.forEach(element => {
      this.usuarioService.getUsuario(element.Usuario_Carnet.toString()).subscribe(
        res => {
          element.Usuario = res;
        },
        err => console.error(err)
      );
    });
  }

  obtenerCatedratico(): void{
    this.publicaciones.forEach(element => {
      if (element.Catedratico_NoCatedratico != null){
        this.catedraticoService.getCatedratico(element.Catedratico_NoCatedratico).subscribe(
          res => {
            element.catedratico = res;
          },
          err => console.error(err)
        );
      }else{
        element.catedratico = this.catedratico;
      }
    });
  }

  obtenerAuxiliar(): void{
    this.publicaciones.forEach(element => {
      if (element.Auxiliar_NoAuxiliar != null){
        this.auxiliarService.getAuxiliar(element.Auxiliar_NoAuxiliar).subscribe(
          res => {
            element.auxiliar = res;
          },
          err => console.error(err)
        );
      }else{
        element.auxiliar = this.auxiliar;
      }
    });
  }

  obtenerCurso(): void{
    this.publicaciones.forEach(element => {
      if (element.Curso_CodigoCurso != null){
        this.cursosService.getCurso(element.Curso_CodigoCurso).subscribe(
          res => {
            element.curso = res;
          },
          err => console.error(err)
        );
      }else{
        element.curso = this.curso;
      }
    });
  }

  obtenerCursoCatedratico(): void{
    this.publicaciones.forEach(element => {
      if (element.idCatedraticoCursoP != null){
        this.cursoCatedraticoService.getCursoCate(element.idCatedraticoCursoP).subscribe(
          res => {
            element.Curso_CodigoCurso = res.Curso_CodigoCurso;
            element.Catedratico_NoCatedratico = res.Catedratico_NoCatedratico;
            element.Auxiliar_NoAuxiliar = res.Auxiliar_NoAuxiliar;
            this.obtenerAuxiliar();
            this.obtenerCurso();
            this.obtenerCatedratico();
          },
          err => console.error(err)
        );
      }
    });

  }
  crearPublicacion(): void{
    this.publicacionNueva.Auxiliar_NoAuxiliar = null;
    this.publicacionNueva.Catedratico_NoCatedratico = null;
    this.publicacionNueva.Curso_CodigoCurso = null;
    this.publicacionNueva.idCatedraticoCursoP = null;
    let date;
    date = new Date();
    date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' +
        ('00' + date.getUTCHours()).slice(-2) + ':' +
        ('00' + date.getUTCMinutes()).slice(-2) + ':' +
        ('00' + date.getUTCSeconds()).slice(-2);
    this.publicacionNueva.Fecha_Date = date;
    this.publicacionNueva.Usuario_Carnet = Number(this.usuario.Carne);
    if  (this.publicacionNueva.Tipo === 1){
      this.publicacionNueva.Curso_CodigoCurso = Number($('#SelectCurso').val());
    }

    if  (this.publicacionNueva.Tipo === 2){
      this.publicacionNueva.Catedratico_NoCatedratico = Number($('#SelectCate').val());
    }

    if  (this.publicacionNueva.Tipo === 3){
      this.publicacionNueva.idCatedraticoCursoP = Number($('#SelectCateCur').val());
    }

    if  (this.publicacionNueva.Tipo === 4){
      this.publicacionNueva.Auxiliar_NoAuxiliar = Number($('#SelectAux').val());
    }
0
    // tslint:disable-next-line: max-line-length
    if (this.publicacionNueva.Auxiliar_NoAuxiliar == null && this.publicacionNueva.Curso_CodigoCurso == null && this.publicacionNueva.idCatedraticoCursoP == null && this.publicacionNueva.Catedratico_NoCatedratico == null){
      alertify.error('Error al Crear la Publicación');
    }else{
      this.publicacionService.registrar(this.publicacionNueva).subscribe(
        res => {
          this.obtenerPublicaciones();
          this.publicacionNueva.Mensaje = '';
          this.publicacionNueva.Catedratico_NoCatedratico = null;
          this.publicacionNueva.idCatedraticoCursoP = null;
          this.publicacionNueva.Curso_CodigoCurso = null;
          this.publicacionNueva.Auxiliar_NoAuxiliar = null;
          alertify.success('Publicación Creada con exito');
        },
        err => {console.error(err); alertify.error('Error al crear la publicacion');}
      );
    }
  }

  CrearComentarios(): void{
    this.publicaciones.forEach(element => {
      this.comentarioService.getComentariosP(element.idPublicacion).subscribe(
        res => {
          element.Comentarios = res;
          this.contarComentario();
        },
        err => console.error(err)
      );
    });
  }

  contarComentario(): void{
    this.publicaciones.forEach(element => {
      element.NComentarios = 0;
      element.Comentarios.forEach(element2 => {
        element.NComentarios++;
      });
    });
  }

  MostrarComentarios(comentarios: Comentario[], publi: Publicacion, com: any): void{
    this.comentarios = comentarios;
    this.comentar = com;
    this.publicacion = publi;
    this.comentario.Usuario_Carnet = this.usuario.Carne;
    this.comentario.Publicacion_id = this.publicacion.idPublicacion;
    this.comentarios.forEach(element => {
      this.usuarioService.getUsuario(element.Usuario_Carnet.toString()).subscribe(
        res => {
          element.usuario = res;
          const Nombres = element.usuario.Nombres.split('');
          const Apellidos = element.usuario.Apellido.split('');
          element.iniciales = Nombres[0] + Apellidos[0];
        },
        err => console.error(err)
      );
    });
  }

  registrarComentario(): void{
    this.comentarioService.registrar(this.comentario).subscribe(
      res => {
        console.log(res);
        this.comentario.Mensaje = '';
        this.actualizarPublicacion(true);
      },
      err => console.error(err)
    );
  }

  actualizarPublicacion(con: any): void{
    this.comentarioService.getComentariosP(this.publicacion.idPublicacion).subscribe(
      res => {
        this.publicacion.Comentarios = res;
        this.MostrarComentarios(this.publicacion.Comentarios, this.publicacion, con);
        this.obtenerPublicaciones();
      },
      err => console.error(err)
    );

  }

  editarComentario(): void{
    this.comentarioService.update(this.comentario.idComentario, this.comentario).subscribe(
      res => {
            console.log(res);
            this.comentario = this.comentarioaux;
            const aux: any = this.comentar;
            this.actualizarPublicacion(this.comentar);
            this.comentar = aux;
            this.editarC = false;
            alertify.success('Comentario actualizado con exito');
      }
    );

  }

  eliminarComentario(idComentario: number): void{
    alertify.confirm('Eliminar datos', '¿Esta seguro de eliminar la publicacion?',
      res2 => {
        this.comentarioService.delete(idComentario).subscribe(
          res => {
            console.log(res);
            this.comentario.Mensaje = '';
            this.actualizarPublicacion(false);
            this.comentar = false;
            alertify.success('Comentario Eliminado con exito');
          },
          err => {console.log(err); alertify.error('Error al eliminar el comentario'); }
        );
      },
      err => {
        alertify.error('Cancelado');
      }).set('labels', {ok: 'Eliminar', cancel: 'Cancelar'
    });
  }

  MostrarMensaje(idPublicacion: number): void{
    alertify.confirm('Eliminar datos', '¿Esta seguro de eliminar la publicacion?',
      res2 => {
        this.publicacionService.delete(idPublicacion).subscribe(
          res => {
            this.obtenerPublicaciones();
            alertify.success('Publicacion Eliminada con exito')
          },
          err => {console.log(err); alertify.error('Error al eliminar la publicacion')}
        );
      },
      err => {
        alertify.error('Cancelado');
      }).set('labels', {ok: 'Eliminar', cancel: 'Cancelar'
    });
  }
}
