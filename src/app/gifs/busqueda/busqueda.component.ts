import { GifsService } from '../services/gifs.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  //@ViewChild: Permite buscar en el HTML un elemento que tenga una variable de referencia
  //local en el template y lo asigna a la variable correspondiente.

  //Non-null assertion operator (!:)
  //The operation x! produces a value of the type of x with null and undefined excluded
  @ViewChild('txtBuscar')
  public txtBuscar!: ElementRef<HTMLInputElement>;

  @ViewChild('cboSeleccionar')
  public cboSeleccionar!: ElementRef<HTMLSelectElement>;

  constructor(
    public gifsService: GifsService
  ) { }

  ngOnInit(): void {
  }

  //ORIGINAL FORMA: OBTENER VALOR DEL INPUT PASANDO UN PARAMETRO EVENT:ANY
  /*
  public buscar(event: any){
    console.log(event);
    console.log(event.target.value);
    this.nombreGif = event.target.value;
    event.target.value = '';
  }
  */

  //PRIMERA FORMA: OBTENER VALOR DEL INPUT PASANDO UN PARAMETRO EVENT: DE TIPO EVENT
  /*
  public buscar(event: Event){
    //PRIMERA SUBFORMA
    //const {target} = event;
    //console.log(target as HTMLInputElement);
    //console.log((target as HTMLInputElement).value);
    //this.nombreGif = (target as HTMLInputElement).value;

    //SEGUNDA SUBFORMA
    const target = event.target as HTMLInputElement;
    this.nombreGif = target.value;
    target.value = '';
    console.log(event);
    console.log(target);
    console.log(this.nombreGif);
  }
  */

  //SEGUNDA FORMA: OBTENER VALOR DEL INPUT CON UNA VARIABLE LOCAL DEL TEMPLATE
  /*
  public buscar(valor: string){
    const inputBuscar = document.getElementById('buscar') as HTMLInputElement | null;
    console.log(valor);
    this.nombreGif = valor;
    inputBuscar!.value='';
  }
  */

  //TERCERA FORMA: OBTENER VALOR USANDO @ViewChild
  public buscar(){

    let valor = this.txtBuscar.nativeElement.value;

    console.log(this.txtBuscar);
    console.log(this.txtBuscar.nativeElement.value);

    this.gifsService.buscarGifs(valor);

    this.txtBuscar.nativeElement.value = '';
  }

  //EJEMPLO OBTENER VALOR DE UN COMBO CON @ViewChild
  /*
  public seleccionarItem(){
    console.log(this.cboSeleccionar);
    console.log(this.cboSeleccionar.nativeElement.value);
    let indice: number = this.cboSeleccionar.nativeElement.selectedIndex;
    console.log(this.cboSeleccionar.nativeElement.options.item(indice)!.text);
    //this.nombreGif != this.cboSeleccionar.nativeElement.textContent;
  }
  */

}
