import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Comentario} from '../models/Comentario';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CatedraticoService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  getCatedraticos(): any {
    return this.http.get<any>(`${this.API_URI}/Catedratico`);
  }

  getCatedratico(id: number): any{
    return this.http.get<any>(`${this.API_URI}/Catedratico/${id}`);
  }
}
