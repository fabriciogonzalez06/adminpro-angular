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

//importar grafica donas
import { GraficaDonaComponent } from "../components/grafica-dona/grafica-dona.component";
import { RxJsComponent } from "./rx-js/rx-js.component";
//import { importExpr } from '@angular/compiler/src/output/output_ast';

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
    RxJsComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component
  ],
  imports: [SharedModule, PAGES_ROUTES, FormsModule, ChartsModule, CommonModule]
})
export class PagesModule {}
