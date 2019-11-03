import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

//funcion para cargar los plugins de la plantilla, este cogido es para cargar algo que est fuera de angular
declare function init_plugins();
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private _route: Router) {}

  ingresar() {
    this._route.navigateByUrl("/dashboard");
  }

  ngOnInit() {
    init_plugins();
  }
}
