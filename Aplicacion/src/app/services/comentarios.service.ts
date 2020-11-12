import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Comentario} from '../models/Comentario';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  getComentarios(): any {
    return this.http.get<any>(`${this.API_URI}/Comentario`);
  }
  getComentariosP(id: number): any{
    return this.http.get<any>(`${this.API_URI}/Comentario/Lista/${id}`);
  }
  getComentario(id: number): any{
    return this.http.get<any>(`${this.API_URI}/Comentario/${id}`);
  }

  delete(id: number): any{
    return this.http.delete<any>(`${this.API_URI}/Comentario/${id}`);
  }

  registrar(comentario: Comentario): any{
    return this.http.post<any>(`${this.API_URI}/Comentario/`, comentario);
  }

  update(id: number, comentario: Comentario): any{
    return this.http.put<any>(`${this.API_URI}/Comentario/${id}`, comentario);
  }
}
