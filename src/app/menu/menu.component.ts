import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public items: any[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {

    this.api.menu({ TamanhoPagina: 30, NumeroPagina: 1, CampoPesquisa: '' }).subscribe((res) => {
      console.log(res.response);

      this.items = res.response;
    }, (err) => console.log(err.error))

  }

  public addCart(item: any): void {
    console.log('Adicionar: ', item);
  }

}
