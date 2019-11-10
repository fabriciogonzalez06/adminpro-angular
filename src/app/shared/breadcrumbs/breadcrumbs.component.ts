import { Component, OnInit } from "@angular/core";
import { Router, ActivationEnd } from "@angular/router";
import { filter, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Title, Meta, MetaDefinition } from "@angular/platform-browser";

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  titulo;

  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {
    this.router.events
      .pipe(
        //filtar solo las instancias de la clase ActivationEnd
        filter(evento => evento instanceof ActivationEnd),
        //filtrar solo los que firstChild sea null
        filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
        map((evento: ActivationEnd) => evento.snapshot.data)
      )
      .subscribe(event => {
        console.log(event);
        this.titulo = event.titulo;
        this.title.setTitle(this.titulo);

        const metaTag: MetaDefinition = {
          name: "description",
          content: this.titulo
        };

        //actulizar meta datos
        this.meta.addTag(metaTag);
      });
  }

  ngOnInit() {}

  /* getDataRoute() {
    return 
  } */
}
