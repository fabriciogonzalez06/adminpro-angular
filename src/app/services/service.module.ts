import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';

import { SettingsService } from "./settings/settings.service";
import { SidebarService } from "./shared/sidebar.service";
import { SharedService } from "./shared/shared.service";
import { UsuarioService } from './usuario/usuario.service'
import { SubirArchivoService } from './service.index';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { HospitalService } from './service.index';
import { MedicoService } from './service.index';


//guard
import { AdminGuard } from './service.index';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { VerificaTokenGuard } from './guards/verifica-token.guard';







@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [AdminGuard,
    MedicoService,
    HospitalService,
    ModalUploadService,
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    VerificaTokenGuard
  ]
})
export class ServiceModule { }
