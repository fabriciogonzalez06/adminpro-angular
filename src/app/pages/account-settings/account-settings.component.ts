import { Component, OnInit } from "@angular/core";
import { SettingsService } from "../../services/settings/settings.service";

@Component({
  selector: "app-account-settings",
  templateUrl: "./account-settings.component.html",
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  constructor(private _ajustes: SettingsService) {}

  ngOnInit() {
    //colocar el check del tema
    this.colocarCheck();
  }

  //funcion para cambiar el color del tema
  cambiarColor(tema: string, link: any) {
    this.aplicarCheck(link);

    //llamar al servicio para aplicar tema
    this._ajustes.aplicarTema(tema);
  }

  //función para aplicar check
  aplicarCheck(link: any) {
    let selectores: any = document.getElementsByClassName("selector");

    //remover la clase que ejecuta el check
    for (let ref of selectores) {
      ref.classList.remove("working");
    }

    //aplicarla al link pasada por parametro
    link.classList.add("working");
  }

  //funcion que coloca el check de el tema en caso de recargar o cambiar componente
  colocarCheck() {
    let selectores: any = document.getElementsByClassName("selector");

    //obtener el tema del local storage
    let tema = this._ajustes.ajustes.tema;

    for (let ref of selectores) {
      if (ref.getAttribute("data-theme") === tema) {
        ref.classList.add("working");
        break;
      }
    }
  }
}
