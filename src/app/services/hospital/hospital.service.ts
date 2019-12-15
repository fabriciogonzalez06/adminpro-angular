import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Hospital } from '../../models/hospital.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private _http: HttpClient) { }



  //=======================================================================
  // Método para obtener un hospital por su id                                                                      
  //=======================================================================
  obtenerHospital(id: string) {
    let url = URL_SERVICIOS + `/hospital/${id}`;

    return this._http.get(url).pipe(
      map((resp: any) => {
        return resp.hospital;
      })
    );
  }


  //=======================================================================
  // Método para buscar hospitales                                                                      
  //============================== =========================================
  buscarHospitales(termino: string) {

    let url = URL_SERVICIOS + `/coleccion/hospitales/${termino}`;

    return this._http.post(url, {}).pipe(
      map((resp: any) => {
        return resp.hospitales;
      })
    );


  }

  //=======================================================================
  // Método para cargar los hospitales                                                                      
  //=======================================================================

  cargarHospitales(desde: number = 0) {

    let url = URL_SERVICIOS + `/hospitales?desde=${desde}`;
    return this._http.get(url);

  }


  //=======================================================================
  // Método para crear nuevo hospital                                                                      
  //=======================================================================
  nuevoHospital(hospital: Hospital, token: string) {

    let url = URL_SERVICIOS + `/hospital?token=${token}`;

    return this._http.post(url, hospital);

  }

  //=======================================================================
  // Actualizar hospital                                                                      
  //=======================================================================
  actualizarHospital(hospital: Hospital, token: string) {

    let url = URL_SERVICIOS + `/hospital/${hospital._id}?token=${token}`;

    return this._http.put(url, hospital).pipe(
      map((resp) => {

        Swal.fire('Hospital actualizado', 'El hospital se actualizo correctamente', 'success');

        return true;

      })
    );


  }


  //=======================================================================
  // Borrar hospital                                                                      
  //=======================================================================

  borrarHospital(id: string, token: string) {
    let url = URL_SERVICIOS + `/hospital/${id}?token=${token}`;

    return this._http.delete(url).pipe(
      map((resp: any) => {

        console.log(resp);
        Swal.fire('Se elimino correctamente', 'Eliminado', 'success');

        return true;

      })
    );
  }

}
