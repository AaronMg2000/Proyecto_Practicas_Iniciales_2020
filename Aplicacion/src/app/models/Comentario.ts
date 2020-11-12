import {Usuario} from './usuario';

export interface Comentario {
  idComentario: number;
  Mensaje: string;
  Publicacion_id: number;
  Usuario_Carnet: number;
  usuario: Usuario;
  iniciales: string;
}
