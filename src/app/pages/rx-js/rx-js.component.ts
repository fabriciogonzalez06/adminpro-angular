import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { retry, map, filter } from "rxjs/operators";

@Component({
  selector: "app-rx-js",
  templateUrl: "./rx-js.component.html",
  styles: []
})
export class RxJsComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor() {
    this.subscription = this.retornaObservable()
      .pipe(retry(2)) //hace dos intentos
      .subscribe(
        numero => console.log("obs", numero),
        err => console.error("hubo un error", err),
        () => console.log("observable terminado")
      );
  }

  ngOnInit() {}

  ngOnDestroy() {
    console.log("saliendo rxjs");
    //debsuscribirse al subscribe
    this.subscription.unsubscribe();
  }

  retornaObservable(): Observable<any> {
    return new Observable(observer => {
      let contador = 1;

      let intervalo = setInterval(() => {
        const salida = {
          valor: contador
        };

        contador += 1;

        observer.next(salida);

        /* if (contador === 4) {
          clearInterval(intervalo);
          observer.complete();
        } */

        /* if (contador === 3) {
          //clearInterval(intervalo);
          observer.error("auxilio");
        } */
      }, 1000);
    }).pipe(
      map(resp => {
        console.log("valor map", resp);
        return resp;
      })
      //filter((valor, index) => {
      //valor es la data e index el indice en base 0
      // console.log("filter", valor, index);

      //if (valor % 2 === 1) {
      //impar
      //return true;
      //} else {
      //return false;
      // }
      //})
    );
  }
}
