import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/service.index';

//funcion para cargar los plugins de la plantilla, este cogido es para cargar algo que est fuera de angular
declare function init_plugins();
declare const gapi: any;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  public email: string;
  public recuerdame: boolean = false;

  public auth2: any;
  constructor(private _route: Router, private _userService: UsuarioService) { }

  ingresar(forma: NgForm) {
    // this._route.navigateByUrl("/dashboard");
    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._userService.login(usuario, forma.value.recuerdame)
      .subscribe(correcto => this._route.navigateByUrl("/dashboard"));
  }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 2) {
      this.recuerdame = true;
    }
  }

  //=======================================================================
  // Funcion para conectar con google                                                                      
  //=======================================================================
  googleInit() {
    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '686495462467-l9ps0fkbhjkqnalkaeg8hu8gpvpbbfrv.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element) {

    this.auth2.attachClickHandler(element, {}, googleUser => {
      let profile = googleUser.getBasicProfile();

      let token = googleUser.getAuthResponse().id_token;

      this._userService.loginGoogle(token).subscribe(resp => window.location.href = '#/dashboard');

    });
  }
}
