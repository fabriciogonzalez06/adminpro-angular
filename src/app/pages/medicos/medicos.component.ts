import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {


  public medicos: Medico[] = [];

  constructor(public _medicoService: MedicoService, private _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  //=======================================================================
  // Método para crear médicos                                                                      
  //=======================================================================
  cargarMedicos() {
    this._medicoService.cargarMedicos().subscribe((resp: Medico[]) => {
      this.medicos = resp;
    });
  }

  //=======================================================================
  // Método para borrar un medico                                                                      
  //=======================================================================
  borrarMedico(medico: Medico) {

    this._medicoService.borrarMedico(medico._id, this._usuarioService.token).subscribe(() => this.cargarMedicos());

  }



  //=======================================================================
  // Método para buscar medicos                                                                      
  //=======================================================================
  buscarMedicos(termino: string) {

    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this._medicoService.buscarMedicos(termino).subscribe((resp: Medico[]) => this.medicos = resp);
  }


}
