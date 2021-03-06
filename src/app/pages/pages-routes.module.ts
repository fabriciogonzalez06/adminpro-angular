import { RouterModule, Routes } from "@angular/router";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxJsComponent } from "./rx-js/rx-js.component";
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

//guards
import { LoginGuardGuard } from '../services/service.index';
import { AdminGuard } from '../services/guards/admin.guard';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';



const pagesRoutes: Routes = [

  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [VerificaTokenGuard],
    data: { titulo: "Dashboard" }
  },
  {
    path: "progress",
    component: ProgressComponent,
    data: { titulo: "Progress" }
  },
  {
    path: "graficas1",
    component: Graficas1Component,
    data: { titulo: "Gráficas" }
  },
  {
    path: "account-settings",
    component: AccountSettingsComponent,
    data: { titulo: "Ajustes del tema" }
  },
  {
    path: "promesas",
    component: PromesasComponent,
    data: { titulo: "Promesas" }
  },
  { path: "rxjs", component: RxJsComponent, data: { titulo: "RxJs" } },
  { path: 'perfil', component: ProfileComponent, data: { titulo: "Perfil usuario" } },
  { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },

  //mantenimiento
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AdminGuard],
    data: { titulo: "Mantenimiento Usuarios" }
  },
  { path: 'hospitales', component: HospitalesComponent, data: { titulo: "Mantenimiento Hospitales" } },
  { path: 'medicos', component: MedicosComponent, data: { titulo: "Mantenimiento Medicos" } },
  { path: "medico/:id", component: MedicoComponent, data: { titulo: "Editar Médico" } },
  { path: "", redirectTo: "dashboard", pathMatch: "full" }

];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
