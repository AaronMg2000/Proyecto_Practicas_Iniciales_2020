import { Time } from '@angular/common';
import {Usuario} from './usuario';
import {Curso} from './Curso';
import {Auxiliar} from './Auxiliar';
import {Catedratico} from './Catedratico';

export interface Publicacion {
  idPublicacion: number;
  Mensaje: string;
  Usuario_Carnet: number;
  Fecha_Date: Date;
  idCatedraticoCursoP: number;
  Curso_CodigoCurso: number;
  Catedratico_NoCatedratico: number;
  Auxiliar_NoAuxiliar: number;
  Tipo: number;
  NComentarios: number;
  Comentarios: any;
  Usuario: Usuario;
  curso: Curso;
  auxiliar: Auxiliar;
  catedratico: Catedratico;
}
