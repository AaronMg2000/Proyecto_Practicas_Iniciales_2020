import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Comentario} from '../models/Comentario';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuxiliarService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  getAuxiliares(): any {
    return this.http.get<any>(`${this.API_URI}/Auxiliar`);
  }

  getAuxiliar(id: number): any{
    return this.http.get<any>(`${this.API_URI}/Auxiliar/${id}`);
  }
}
