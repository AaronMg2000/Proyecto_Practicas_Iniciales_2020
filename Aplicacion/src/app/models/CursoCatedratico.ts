import {Curso} from './Curso';
import {Auxiliar} from './Auxiliar';
import {Catedratico} from './Catedratico';

export interface CursoCatedratico {
  idCatedraticoCurso: number;
  Curso_CodigoCurso: number;
  Catedratico_NoCatedratico: number;
  Auxiliar_NoAuxiliar: number;
  curso: Curso;
  auxiliar: Auxiliar;
  catedratico: Catedratico;
}
