import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service';
import {ComentariosService} from '../../services/comentarios.service';
import {PublicacionService} from '../../services/publicacion.service';
import {AuxiliarService} from '../../services/auxiliar.service';
import {CatedraticoService} from '../../services/catedratico.service';
import {CursosService} from '../../services/cursos.service';
import {CursoCatedraticoService} from '../../services/curso-catedratico.service';
import * as alertify from 'alertifyjs';


import {Usuario} from '../../models/usuario';
import {Publicacion} from '../../models/Publicacion';
import {Comentario} from '../../models/Comentario';
import { Auxiliar } from 'src/app/models/Auxiliar';
import { Catedratico } from 'src/app/models/Catedratico';
import { Curso } from 'src/app/models/Curso';

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

    comentario: Comentario = {
      idComentario: null,
      Mensaje: '',
      Publicacion_id: 0,
      Usuario_Carnet: '',
      usuario: this.usuario,
      iniciales: ''
    };

    comentarios: Comentario[] = [];
    publicaciones: Publicacion[] = [];

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
