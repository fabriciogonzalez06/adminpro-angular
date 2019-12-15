import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/service.index';
import { Hospital } from '../../models/hospital.model';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[];
  public cuantos: number;
  public desde: number = 0;
  public cargando: boolean = false;
  constructor(public _modalUploadService: ModalUploadService, public _hospitalService: HospitalService, public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarHospitales();


    //suscribirse a cambios emitidos en la modalUploadService
    this._modalUploadService.notificacion.subscribe((resp) => this.cargarHospitales());
  }



  //=======================================================================
  // Método para cargar hospitales                                                                      
  //=======================================================================
  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales(this.desde).subscribe((resp: any) => {

      this.cuantos = resp.total;
      this.hospitales = resp.hospitales;
      this.cargando = false;
    });
  }


  //=======================================================================
  // Mostrar modal de la imagen                                                                      
  //=======================================================================
  mostrarModal(id: string) {

    console.log(id);
    this._modalUploadService.mostrarModal('hospitales', id);

  }

  //=======================================================================
  // Método para buscar hospitales                                                                      
  //=======================================================================

  buscarHospitales(termino: string) {

    if (termino.length === 0) {

      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospitales(termino).subscribe((resp: Hospital[]) => {
      this.hospitales = resp;
    });
  }

  //=======================================================================
  // Método para crear hospital
  //=======================================================================
  crearHospital() {

    Swal.fire({
      title: 'Nuevo usuario',
      input: 'text',
      inputPlaceholder: 'Nombre ',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Crear',
      showLoaderOnConfirm: true,
      preConfirm: (nombre) => {

        if (nombre.length < 7) {
          return;
        }

        let hospital = new Hospital(nombre, this._usuarioService.usuario._id);

        return this._hospitalService.nuevoHospital(hospital, this._usuarioService.token).subscribe((resp: any) => {

          this.cargarHospitales();
          /* this.cuantos = resp.total; */

        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {


      if (result.value && result.value.length > 6) {
        Swal.fire({
          title: `Hospital creado`,
          icon: 'success'
        })


      }
    })
  }

  //=======================================================================
  // Método para paginacion                                                                      
  //=======================================================================

  cambiarDesde(valor: number) {

    let desde = this.desde + valor;


    if (desde >= this.cuantos) {
      return;
    }
    if (desde <= 0) {

      return;
    }


    this.desde = desde;
    this.cargarHospitales();

  }

  //=======================================================================
  // Método para actualizar hospital                                                                      
  //=======================================================================
  guardarHospital(hospital: Hospital) {

    this._hospitalService.actualizarHospital(hospital, this._usuarioService.token).subscribe((result => {
      console.log(result);
      this.cargarHospitales();
    }));

  }

  //=======================================================================
  // Método para borrar el hospital                                                                      
  //=======================================================================
  borrarHospital(hospital: Hospital) {



    Swal.fire({
      title: 'está seguro?',
      text: `Esta a punto de borrar el hospital ${hospital.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
      showClass: {
        popup: 'animated fadeInDown faster'
      },
      hideClass: {
        popup: 'animated fadeOutUp faster'
      }
    }).then((result) => {
      console.log(result);
      if (result.value) {


        this._hospitalService.borrarHospital(hospital._id, this._usuarioService.token).subscribe(resp => {


          Swal.fire({
            title: 'Borrado',
            text: `Se borró a ${hospital.nombre}`,
            icon: 'success',
            hideClass: {
              popup: 'animated fadeOutUp faster'
            }
          })

          this.cargarHospitales();
        });

      }
    })


  }

}
