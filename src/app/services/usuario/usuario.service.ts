import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;
  public token: string;

  constructor(public http: HttpClient, public _router: Router) {
    this.cargarStorage();
  }


  //=======================================================================
  // Función para guardar en el local storage                                                                      
  //=======================================================================
  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  //=======================================================================
  // Login con google                                                                      
  //=======================================================================
  loginGoogle(token: string): Observable<any> {

    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token }).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }


  //=======================================================================
  // Método para login normal                                                                   
  //=======================================================================

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {

        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );

  }


  //=======================================================================
  // Método para salir de la aplicacion                                                                      
  //=======================================================================

  logout() {

    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this._router.navigate(['/login']);

  }


  //=======================================================================
  // Método para crear un usuario                                                                       
  //=======================================================================
  crearUsuario(usuario: Usuario) {

    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario).pipe(
      map((res: any) => {

        Swal.fire({
          title: 'Usuario creado',
          text: `${res.usuario.email}`,
          icon: 'success'
        });
        return res.usuario;
      })
    );

  }

  //=======================================================================
  // Método para saber si esta logueado sera el que utilice el guard                                                                      
  //=======================================================================
  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  //=======================================================================
  // Funcion para precargar las propiedades usuario y token                                                                      
  //=======================================================================

  cargarStorage() {

    if (localStorage.getItem('token')) {

      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));

    } else {
      this.token = '';
      this.usuario = null;
    }

  }

}
