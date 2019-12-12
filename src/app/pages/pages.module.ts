import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";

import { PagesComponent } from "./pages.component";

import { Graficas1Component } from "./graficas1/graficas1.component";
import { ProgressComponent } from "./progress/progress.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SharedModule } from "../shared/shared.module";
import { PAGES_ROUTES } from "./pages-routes.module";

//formularios
import { FormsModule } from "@angular/forms";

//Graficas
import { ChartsModule } from "ng2-charts";

import { IncrementadorComponent } from "../components/incrementador/incrementador.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";

//Pipes
import { PipesModule } from '../pipes/pipes.module';

//importar grafica donas
import { GraficaDonaComponent } from "../components/grafica-dona/grafica-dona.component";
import { RxJsComponent } from "./rx-js/rx-js.component";
//import { importExpr } from '@angular/compiler/src/output/output_ast';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficaDonaComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxJsComponent,
    ProfileComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    ProfileComponent
  ],
  imports: [CommonModule, SharedModule, PAGES_ROUTES, FormsModule, ChartsModule, CommonModule, PipesModule]
})
export class PagesModule { }
