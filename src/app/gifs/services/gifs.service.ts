import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs';

@Injectable({
  //providedIn: 'root': permite que el servicio este disponible de forma global para toda la aplicación
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'rNZDkOtDwnjQwyxfJMGcLik5VHUBMGIr';
  private limit: string = '10';
  private endPoint: string = 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  public resultados: Gif[] = [];

  public get historial(): string[] {
    //Cortamos el arreglo y mostramos solo los 10 primeros
    //this._historial = this._historial.splice(0,10);
    return [...this._historial];
  }

  constructor(
    private http: HttpClient
  ) {
    //Si existe el historial de busquedas en el localStorage lo obtenemos.
    //PRIMERA FORMA:
    //if(localStorage.getItem('historial') != null) {
    //  this._historial = JSON.parse(localStorage.getItem('historial')!) as string[];
    //}

    //if(localStorage.getItem('resultados') != null) {
    //  this.resultados = JSON.parse(localStorage.getItem('resultados')!) as Gif[];
    //}

    //SEGUNDA FORMA:
    this._historial = JSON.parse(localStorage.getItem('historial')!) as string[] || [];

    this.resultados = JSON.parse(localStorage.getItem('resultados')!) as Gif[] || [];
  }

  //SEGUNDA FORMA: CONSUMIR SERVICIO CON EL FETCH API Y EL ASINC
  //async buscarGifs(terminoBusqueda: string){
  //FORMA ORIGINAL
  buscarGifs(terminoBusqueda: string): void{

    if(terminoBusqueda == null || terminoBusqueda == undefined || terminoBusqueda.trim().length === 0){
      return;
    }

    terminoBusqueda = terminoBusqueda.trim().toUpperCase();

    if(!this._historial.includes(terminoBusqueda)){
      this._historial.unshift(terminoBusqueda);

      //Cortamos el arreglo y mostramos solo los 10 primeros
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    console.log(this._historial);

    //LLAMADO AL API DE GIPHY DEVELOPERS (SERVICIO)

    //PRIMERA FORMA: CONSUMIR SERVICIO CON EL FETCH API
    /*
    fetch('https://api.giphy.com/v1/gifs/search?api_key=rNZDkOtDwnjQwyxfJMGcLik5VHUBMGIr&q=dragon ball z&limit=10')
      .then(response => {
        response.json().then(data => {
          console.log(data);
        })
    });
    */

    //SEGUNDA FORMA: CONSUMIR SERVICIO CON EL FETCH API Y EL ASINC --> INCLUIDO EN LA DEFINICION DE METODO
    /*
    const response = await fetch('https://api.giphy.com/v1/gifs/search?api_key=rNZDkOtDwnjQwyxfJMGcLik5VHUBMGIr&q=dragon ball z&limit=10');
    const data = await response.json();
    console.log(data);
    */

    let params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', terminoBusqueda)
      .set('limit', this.limit);

    console.log(params);

    //this.http.get<SearchGifsResponse>(`${this.endPoint}?api_key=${this.apiKey}&q=${terminoBusqueda}&limit=10`).subscribe({
    this.http.get<SearchGifsResponse>(`${this.endPoint}/search`, {params: params}).subscribe({
      next: response => {
        console.log(response.data);
        this.resultados = response.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      },
      error: err => {
        console.log(err);
      }
    });

  }

}
