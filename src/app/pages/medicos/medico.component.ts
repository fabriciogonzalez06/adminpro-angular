import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { HospitalService } from 'src/app/services/service.index';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public medico: Medico = new Medico('', '', '', '');
  public hospital: Hospital = new Hospital('');

  constructor(private router: Router,
    public _medicoService: MedicoService,
    private _hospitalService: HospitalService,
    private activatedRoute: ActivatedRoute,
    private _modalUploadService: ModalUploadService) {

    this.activatedRoute.params.subscribe(param => {

      let id = param['id'];

      if (id != 'nuevo') {
        this.obtenerMedico(id);
      }

    });

  }

  ngOnInit() {
    this._hospitalService.cargarHospitales().subscribe((resp: any) => this.hospitales = resp.hospitales);

    this._modalUploadService.notificacion.subscribe(resp => {

      this.medico.img = resp.medico.img;
    });
  }


  //=======================================================================
  // Método para abrir modal que cambia imagen                                                                      
  //=======================================================================
  cambiarImagen() {
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }

  //=======================================================================
  // Método para obtener un médico                                                                      
  //=======================================================================
  obtenerMedico(id: string) {

    this._medicoService.cargarMedico(id).subscribe((medico: any) => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });

  }

  //=======================================================================
  // Método para guardar o actualizar el médico                                                                       
  //=======================================================================
  guardarMedico(forma: NgForm) {

    console.log(forma.valid);
    console.log(forma);

    if (forma.invalid) {
      return;
    }

    this._medicoService.guardarMedico(this.medico).subscribe((resp: Medico) => {

      this.medico._id = resp._id;

      this.router.navigate(['/medico', resp._id]);

    });


  }

  //=======================================================================
  //  Método para cambiar el hospital cuando cambie el combobox                                                                     
  //=======================================================================
  cambioHospital(id: string) {
    this._hospitalService.obtenerHospital(id).subscribe((hospital: Hospital) => {
      this.hospital = hospital;
    });
  }

}
