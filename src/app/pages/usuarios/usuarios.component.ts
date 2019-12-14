import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  public usuarios: Usuario[] = [];

  public desde: number = 0;

  public totalUsuarios: number = 0;

  public cargando: boolean = true;

  constructor(public _usuarioService: UsuarioService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();

    //suscribirse al emitidor de eventos del modalUploadService cuando cambia la image
    this._modalUploadService.notificacion.subscribe(resp => this.cargarUsuarios());
  }


  mostrarModal(id: string) {

    this._modalUploadService.mostrarModal('usuarios', id);
  }


  //=======================================================================
  // Método para cargar usuarios desde 0                                                                      
  //=======================================================================
  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {

      this.totalUsuarios = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  //=======================================================================
  // Método para buscar siguientes o anteriores usurios                                                                      
  //=======================================================================
  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if (desde > this.totalUsuarios) {
      return;
    }

    if (desde < 0) {
      return;
    }
    this.desde = desde;
    this.cargarUsuarios();
  }


  //=======================================================================
  // Método para buscar usuarios por nombre                                                                      
  //=======================================================================
  buscarUsuario(termino: string) {

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios(termino).subscribe((usuarios: Usuario[]) => {

      this.usuarios = usuarios;
      this.cargando = false;

    });
  }


  //=======================================================================
  // Método para borrar el usuario                                                                      
  //=======================================================================

  usuarioBorrar(usuario: Usuario) {


    if (usuario._id === this._usuarioService.usuario._id) {
      Swal.fire({
        title: 'Error al borrar usuario',
        text: 'no se puede borrar a si mismo',
        icon: 'warning'
      });
      return;
    }

    Swal.fire({
      title: 'está seguro?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
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


        this._usuarioService.borrarUsuario(usuario._id).subscribe(resp => {


          Swal.fire({
            title: 'Borrado',
            text: `Se borró a ${usuario.nombre}`,
            icon: 'success',
            hideClass: {
              popup: 'animated fadeOutUp faster'
            }
          })

          this.cargarUsuarios();
        });

      }
    })

  }


  //=======================================================================
  // Método para guardar usuario                                                                      
  //=======================================================================
  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }


}
