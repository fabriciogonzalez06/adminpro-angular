import { NgModule } from "@angular/core";

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

//importar grafica donas
import { GraficaDonaComponent } from "../components/grafica-dona/grafica-dona.component";

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficaDonaComponent,
    AccountSettingsComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component
  ],
  imports: [SharedModule, PAGES_ROUTES, FormsModule, ChartsModule]
})
export class PagesModule {}
