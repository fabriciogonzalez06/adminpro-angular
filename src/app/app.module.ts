import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

//modulos
import { PagesModule } from "./pages/pages.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./login/register.component";
import { FormsModule } from "@angular/forms";
//import { GraficaDonaComponent } from "./components/grafica-dona/grafica-dona.component";

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [BrowserModule, PagesModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
