import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2'
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./login.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  public forma: FormGroup;

  //Funcion para evaluar si son iguales
  sonIguales(campo1: string, campo2: string) {

    return (group: FormGroup) => {
      let pass1: string = group.controls[campo1].value;
      let pass2: string = group.controls[campo2].value;

      if (pass1 === pass2) {

        //con null passa la validacion
        return null;
      }

      // no pasa la validacion 
      return { sonIguales: true }
    }
  }

  ngOnInit() {

    //valor por defecto, validaciones, validaciones asincronas
    this.forma = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      password2: new FormControl(null, [Validators.required]),
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales('password', 'password2') });

  }

  registrarUsuario() {

    //si la forma es invalida
    if (this.forma.invalid) {
      return;
    }

    //sino a aceptado las condiciones
    if (!this.forma.value.condiciones) {
      Swal.fire({
        title: 'Mensaje', text: 'Debe aceptar las condiciones', icon: 'warning'
      });
      return;
    }


    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario(usuario).subscribe(res => this.router.navigate(['/login']));

  }
}
