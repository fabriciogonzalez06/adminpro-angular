import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';

import Swal from 'sweetalert2'
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;
  public token: string;
  public menu: any[] = [];
  constructor(public http: HttpClient, public _router: Router, public _subirArchivoService: SubirArchivoService) {
    this.cargarStorage();
  }


  //=======================================================================
  // Función para guardar en el local storage                                                                      
  //=======================================================================
  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

  }

  //=======================================================================
  // Login con google                                                                      
  //=======================================================================
  loginGoogle(token: string): Observable<any> {

    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token }).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
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

        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      }),

      catchError((err) => {
        console.log(err);
        Swal.fire('Error en el login', err.error.message, 'error');
        return throwError(err.message);
      })
    );

  }


  //=======================================================================
  // Método para salir de la aplicacion                                                                      
  //=======================================================================

  logout() {

    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

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
      }),
      catchError(err => {
        console.log(err);
        Swal.fire(err.error.message, err.error.errors.message, 'error');
        return throwError(err.message);
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
      this.menu = JSON.parse(localStorage.getItem('menu'));

    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }

  }

  //=======================================================================
  // Método para actualizar el usuario                                                                      
  //=======================================================================

  actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;

    url += '?token=' + this.token;

    //let headers = new HttpHeaders().set('token', this.token);

    /* let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('token', this.token); */

    return this.http.put(url, usuario).pipe(
      map((resp: any) => {


        if (usuario._id === this.usuario._id) {
          let usuarioDB: Usuario = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);

        }

        Swal.fire({
          title: 'Usuario actualizado',
          text: usuario.nombre,
          icon: 'success'
        });

        return true;

      }),
      catchError(err => {
        console.log(err);
        Swal.fire(err.error.message, err.error.errors.message, 'error');
        return throwError(err.message);
      })
    );


  }


  //=======================================================================
  // Mëtodo para cambiar la imagen de un usuario del tipo que sea                                                                      
  //=======================================================================

  cambiarImagen(archivo: File, id: string) {


    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id).then((resp: any) => {
      console.log(resp);
      this.usuario.img = resp.usuario.img;



      Swal.fire({
        title: 'Imagen actualizada',
        text: this.usuario.nombre,
        icon: "success"
      });

      this.guardarStorage(this.usuario._id, this.token, this.usuario, this.menu);

    }).catch(resp => {
      console.log(resp);
    });

  }

  //=======================================================================
  // Método para cargar los usuarios                                                                      
  //=======================================================================
  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + `/usuarios?desde=${desde}`;

    return this.http.get(url);
  }

  //=======================================================================
  // Método para buscar usuarios                                                                      
  //=======================================================================
  buscarUsuarios(termino: string) {
    let url = URL_SERVICIOS + `/coleccion/usuarios/${termino}`;
    return this.http.post(url, {}).pipe(
      map((resp: any) => {
        return resp.usuarios;
      })
    );
  }

  //=======================================================================
  // Borrar usuario                                                                      
  //=======================================================================
  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + `/usuario/${id}?token=${this.token}`;
    return this.http.delete(url).pipe(
      map((resp: any) => {


        //Swal.fire('Usuario borrado', 'Se borro correctamente', 'success');
        return true;
      })
    );
  }


}
