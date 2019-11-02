import { Component, OnInit, Input } from "@angular/core";

import { ChartType } from "chart.js";
import { MultiDataSet, Label } from "ng2-charts";

@Component({
  selector: "app-grafica-dona",
  templateUrl: "./grafica-dona.component.html",
  styles: []
})
export class GraficaDonaComponent implements OnInit {
  //recibir array para las graficas
  @Input() grafica: any;

  constructor() {}

  ngOnInit() {}

  @Input("chartLabels") doughnutChartLabels: Label[];
  @Input("chartData") doughnutChartData: MultiDataSet;
  @Input("chartType") doughnutChartType: ChartType;
}
