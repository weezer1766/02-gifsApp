import { Gif } from './../../gifs/interfaces/gifs';
import { GifsService } from './../../gifs/services/gifs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public get historial(): string[] {
    return this.gifsService.historial;
  }

  constructor(
    public gifsService: GifsService
  ) { }

  ngOnInit(): void {
  }

  public cargarImagen(item: string): void{
    console.log(item);
    this.gifsService.buscarGifs(item);
  }

}
