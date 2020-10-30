import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Usuario} from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUsuarios() {
    return this.http.get(`${this.API_URI}/Usuarios`);
  }
  getUsuario(id: string){
    return this.http.get(`${this.API_URI}/Usuarios/${id}`);
  }

  delete(id:string){
    return this.http.delete(`${this.API_URI}/Usuarios/${id}`);
  }

  registrar(usuario: Usuario){
    return this.http.post(`${this.API_URI}/Usuarios/`, usuario);
  }

  update(id: string, updatedUser: Usuario){
    return this.http.put(`${this.API_URI}/Usuarios/${id}`, updatedUser);
  }
}
