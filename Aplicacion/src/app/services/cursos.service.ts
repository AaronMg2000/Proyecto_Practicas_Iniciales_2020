import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  getCursos(): any {
    return this.http.get<any>(`${this.API_URI}/Curso`);
  }

  getCurso(id: number): any{
    return this.http.get<any>(`${this.API_URI}/Curso/${id}`);
  }

  getListaCurso(id: string): any{
    return this.http.get<any>(`${this.API_URI}/Curso/Lista/${id}`);
  }
}
