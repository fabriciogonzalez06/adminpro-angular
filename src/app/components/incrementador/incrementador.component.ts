import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgreso',{static:false}) txtProgreso: ElementRef;

  @Input() progreso=50;
  @Input('nombre') leyenda='leyenda';

  @Output('cambiarValor') cambioValor:EventEmitter<number> = new EventEmitter();

  constructor() { 
    console.log(this.progreso);
    console.log(this.leyenda);
  }



  ngOnInit() {
    console.log(this.leyenda);
    console.log(this.progreso);
  }

  onChanges(newValue:number){
    
     
    //let elementHTMl:any= document.getElementsByName('progreso')[0];
    
   

    if(newValue>=100){
      this.progreso=100;
    }else if(newValue<0){
      this.progreso=0;
    }else{
      this.progreso=newValue;
    }

    
    //elementHTMl.value=this.progreso;

    this.txtProgreso.nativeElement.value=this.progreso;

    this.cambioValor.emit(this.progreso);

    //cambiar el foco
    this.txtProgreso.nativeElement.focus();

  }

  cambiarValor(valor:number){
       
    if(this.progreso>=100 && valor>0){
      this.progreso=100;
      return;
    }

    if(this.progreso<=0 && valor <0){
      this.progreso=0;
      return;
    }


    this.progreso+=valor;
    this.cambioValor.emit(this.progreso);
  }

}
