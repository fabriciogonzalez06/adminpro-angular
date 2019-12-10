import { Component } from "@angular/core";
import { SettingsService } from "./services/settings/settings.service";

declare function init_plugins();

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "adminPro";
  constructor(private _ajustes: SettingsService) {
    init_plugins();
  }
}
