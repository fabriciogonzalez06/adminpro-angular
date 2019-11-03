import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class SettingsService {
  ajustes: Ajustes = {
    temaUrl: "assets/css/colors/default.css",
    tema: "default"
  };

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
  }

  //guardar ajustes
  guardarAjustes() {
    console.log("guardando en el local storage");
    localStorage.setItem("ajustes", JSON.stringify(this.ajustes));
  }

  //cargar los ajustes
  cargarAjustes() {
    if (localStorage.getItem("ajustes")) {
      this.ajustes = JSON.parse(localStorage.getItem("ajustes"));
      console.log("cargando del local storage");

      //llamar a la función para aplicar el tema
      this.aplicarTema(this.ajustes.tema);
    } else {
      console.log("Cargando valores por defecto");
    }
  }

  //aplicar ajustes
  aplicarTema(tema: string) {
    let url = `assets/css/colors/${tema}.css`;
    this._document.getElementById("tema").setAttribute("href", url);

    //guardar en el localstorage
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
