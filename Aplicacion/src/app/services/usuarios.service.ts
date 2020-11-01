import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Usuario} from '../models/usuario';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  getUsuarios() {
    return this.http.get<any>(`${this.API_URI}/Usuarios`);
  }
  getUsuario(id: string){
    return this.http.get<any>(`${this.API_URI}/Usuarios/${id}`);
  }

  delete(id:string){
    return this.http.delete<any>(`${this.API_URI}/Usuarios/${id}`);
  }

  registrar(usuario: Usuario){
    return this.http.post<any>(`${this.API_URI}/Usuarios/`, usuario);
  }

  update(id: string, updatedUser: Usuario){
    return this.http.put<any>(`${this.API_URI}/Usuarios/${id}`, updatedUser);
  }
  login(usuario: Usuario){
    return this.http.post<any>(`${this.API_URI}/Usuarios/Login`, usuario);
  }

  loggedIN(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  cerrarSesion(){
    localStorage.removeItem('token');
    this.router.navigate(['/Login']);
  }
}
