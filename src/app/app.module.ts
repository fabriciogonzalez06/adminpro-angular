import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

//modulos
import { PagesModule } from "./pages/pages.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./login/register.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
//import { GraficaDonaComponent } from "./components/grafica-dona/grafica-dona.component";

//importar el modulo de los servicios
import { ServiceModule } from "./services/service.module";
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';






@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, PagesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
