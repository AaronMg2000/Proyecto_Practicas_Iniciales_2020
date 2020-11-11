import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {CursoA} from '../models/CursoAprobado';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CursosAprobadosService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  getCursos(id: string): any {
    return this.http.get<any>(`${this.API_URI}/CursoA/List/${id}`);
  }

  getCursoA(id: string, id2: number): any{
    return this.http.get<any>(`${this.API_URI}/CursoA/${id}/${id2}`);
  }

  delete(id: number, id2: number): any{
    return this.http.delete<any>(`${this.API_URI}/CursoA/${id}/${id2}`);
  }

  registrar(cursoA: CursoA): any{
    console.log(cursoA);
    return this.http.post<any>(`${this.API_URI}/CursoA/`, cursoA);
  }

  update(id: number, id2: number, updateCurso: CursoA): any{
    return this.http.put<any>(`${this.API_URI}/CursoA/${id}/${id2}`, updateCurso);
  }
}
