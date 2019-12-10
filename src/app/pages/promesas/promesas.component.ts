import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";

import * as XLSX from "xlsx";
@Component({
  selector: "app-promesas",
  templateUrl: "./promesas.component.html",
  styles: []
})
export class PromesasComponent implements OnInit {
  @ViewChild("TABLE", { static: false }) table: ElementRef;
  @ViewChild("TABLE2", { static: false }) table2: ElementRef;

  exportarExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.table.nativeElement
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "ScoreSheet.xlsx");
  }

  exportarExcel2() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.table2.nativeElement
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "ScoreSheet.xlsx");
  }

  arreglo: any[] = [];

  arreglo2: any[] = [];

  constructor() {
    this.contarTres()
      .then(res => console.log("terminada", res))
      .catch(err => console.log("error", err));

    //================================================================
    //Arreglo 1
    //==============================================================
    this.arreglo = [
      {
        pregunta: "pregunta1",
        respuestas: ["res1.1", "res1.2", "res1.3", "res1.4"],
        cantidades: [2, 4, 6, 8]
      },
      {
        pregunta: "pregunta2",
        respuestas: ["res2.1", "res2.2", "res2.3"],
        cantidades: [10, 6, 2]
      },
      {
        pregunta: "pregunta3",
        respuestas: ["res3.1", "res3.2", "res3.3", "res3.4"],
        cantidades: [20, 4, 1, 8]
      }
    ];

    //================================================================
    //Arreglo 2
    //==============================================================
    this.arreglo2 = [
      {
        pregunta: "pregunta1",
        respuestas: ["mango", 10, "pera", 20, "sandia", 50]
      },
      {
        pregunta: "pregunta2",
        respuestas: ["si", 40, "no", 55]
      },
      {
        pregunta: "pregunta3",
        respuestas: ["etnia1", 30, "etnia2", 55, "etnia3", 80, "etnia4", 66]
      }
    ];
  }

  ngOnInit() {}

  contarTres(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let contador = 0;

      let intervalo = setInterval(() => {
        contador += 1;
        console.log(contador);

        if (contador === 3) {
          resolve(true);
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }

  //=============================================================
  //Degt
  //============================================================
}
