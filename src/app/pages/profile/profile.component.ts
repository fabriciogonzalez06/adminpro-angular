import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  public usuario: Usuario;

  public imagenSubir: File;

  public imagenTemp: string | ArrayBuffer;

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {

    this.usuario.nombre = usuario.nombre;

    if (!this.usuario.google) {

      this.usuario.email = usuario.email;
    }
    console.log(this.usuario);

    this._usuarioService.actualizarUsuario(this.usuario).subscribe(result => {
      console.log(result);
    });
  }

  //=======================================================================
  // Método asignar el archivo a subir                                                                      
  //=======================================================================
  seleccionImagen(archivo: File) {

    //si cancela la carga
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    //validacion basica si no es una imagen
    if (archivo.type.indexOf('image') < 0) {
      Swal.fire({
        title: 'Solo imagenes',
        text: 'el archivo seleccionado no es una imagen',
        icon: 'error'
      });
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    //javascript puro
    let reader = new FileReader();

    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  //=======================================================================
  // Método para subir la imagen                                                                      
  //=======================================================================
  cambiarImagen() {

    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);

  }

}
