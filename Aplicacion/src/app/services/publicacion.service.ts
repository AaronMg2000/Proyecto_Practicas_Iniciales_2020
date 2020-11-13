import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Publicacion} from '../models/Publicacion';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  getPublicaciones(): any {
    return this.http.get<any>(`${this.API_URI}/Publicacion`);
  }

  getPublicacion(id: number): any{
    return this.http.get<any>(`${this.API_URI}/Publicacion/${id}`);
  }

  getPublicacion2(id: number): any{
    return this.http.get<any>(`${this.API_URI}/Publicacion/Tipo/${id}`);
  }

  getPublicacionCate(id: number): any{
    return this.http.get<any>(`${this.API_URI}/Publicacion/Cate/${id}`);
  }
  getPublicacionCurso(id: number): any{
    return this.http.get<any>(`${this.API_URI}/Publicacion/Curso/${id}`);
  }
  getPublicacionCursoCate(id: number): any{
    return this.http.get<any>(`${this.API_URI}/Publicacion/CursoCate/${id}`);
  }
  getPublicacionAux(id: number): any{
    return this.http.get<any>(`${this.API_URI}/Publicacion/Aux/${id}`);
  }

  delete(id: number): any{
    return this.http.delete<any>(`${this.API_URI}/Publicacion/${id}`);
  }

  registrar(publicacion: Publicacion): any{
    return this.http.post<any>(`${this.API_URI}/Publicacion/`, publicacion);
  }

  update(id: number, publicacion: Publicacion): any{
    return this.http.put<any>(`${this.API_URI}/Publicacion/${id}`, publicacion);
  }
}
