import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SettingsService } from "./settings/settings.service";
import { SidebarService } from "./shared/sidebar.service";
import { SharedService } from "./shared/shared.service";
import { UsuarioService } from './usuario/usuario.service'

import { HttpClientModule } from '@angular/common/http';

//guard
import { LoginGuardGuard } from './guards/login-guard.guard';
import { SubirArchivoService } from './service.index';


SubirArchivoService


@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [SettingsService, SidebarService, SharedService, UsuarioService, LoginGuardGuard, SubirArchivoService]
})
export class ServiceModule { }
