import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Medico } from 'src/app/models/medico.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})

export class MedicoService {

  public totalMedicos: number = 0;

  constructor(public _http: HttpClient, private _usuarioService: UsuarioService) { }


  //=======================================================================
  // Método para obtener un medico por su id                                                                      
  //=======================================================================
  cargarMedico(id: string) {
    let url = URL_SERVICIOS + `/medico/${id}`;
    return this._http.get(url).pipe(
      map((resp: any) => {
        return resp.medico;
      })
    );

  }
  //=======================================================================
  // Método para cargar medicos                                                                      
  //=======================================================================

  cargarMedicos() {
    let url = URL_SERVICIOS + `/medicos`;

    return this._http.get(url).pipe(
      map((resp: any) => {

        this.totalMedicos = resp.total;
        return resp.medicos;

      })
    );
  }

  //=======================================================================
  // Método para buscar médicos                                                                      
  //=======================================================================

  buscarMedicos(termino: string) {

    let url = URL_SERVICIOS + `/coleccion/medicos/${termino}`;

    return this._http.post(url, {}).pipe(
      map((resp: any) => {
        return resp.medicos;
      })
    );


  }

  //=======================================================================
  // Método para borrar un medico                                                                      
  //=======================================================================
  borrarMedico(id: string, token: string) {

    let url = URL_SERVICIOS + `/medico/${id}?token=${token}`;

    return this._http.delete(url).pipe(
      map((resp: any) => {

        Swal.fire('Médico borrado', 'Médico borrado correctamente', 'success');
        return resp;
      })
    );

  }

  //=======================================================================
  // Método para guardar o actualizar medico                                                                      
  //=======================================================================
  guardarMedico(medico: Medico) {


    if (medico._id) {
      let url = URL_SERVICIOS + `/medico/${medico._id}?token=${this._usuarioService.token}`;
      return this._http.put(url, medico).pipe(
        map((resp: any) => {



          Swal.fire('Médico Actualizado', medico.nombre + ' actualizado correctamente', 'success');
          return resp.medicoActualizado;
        })
      );

    } else {//creando porque no existe id

      let url = URL_SERVICIOS + `/medico?token=${this._usuarioService.token}`;
      return this._http.post(url, medico).pipe(
        map((resp: any) => {

          Swal.fire('Médico creado', medico.nombre + ' creado correctamente', 'success');

          return resp.medico;
        })
      );
    }



  }

}
