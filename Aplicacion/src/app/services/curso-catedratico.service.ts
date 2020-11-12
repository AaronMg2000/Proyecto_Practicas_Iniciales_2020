import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Comentario} from '../models/Comentario';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CursoCatedraticoService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  getCursosCate(): any {
    return this.http.get<any>(`${this.API_URI}/CursoCatedratico`);
  }

  getCursoCate(id: number): any{
    return this.http.get<any>(`${this.API_URI}/CursoCatedratico/${id}`);
  }
}
