import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {


  public imagenSubir: File;

  public imagenTemp: string | ArrayBuffer;

  constructor(public _subirArchivoService: SubirArchivoService, public _modalUploadService: ModalUploadService) {

  }

  ngOnInit() {
  }





  //=======================================================================
  // Método para cerrar la modal del modal-upload                                                                      
  //=======================================================================
  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;

    this._modalUploadService.ocultarModal();
  }

  //=======================================================================
  // Método para subir imagen                                                                      
  //=======================================================================
  subirImagen() {
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
      .then((resp) => {

        console.log(resp);
        this._modalUploadService.notificacion.emit(resp);
        /* this._modalUploadService.ocultarModal(); */
        this.cerrarModal();

      }).catch((resp) => {
        console.log("error en la carga ");
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


}
