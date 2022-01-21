import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ZTranslateService } from 'zmaterial';
import { ApiService } from "../services/api.service";

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  public isLoading = false;

  public items: any[] = [];

  public constructor(
    private tService: ZTranslateService,
    public api: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.items.push({
      codigo: 1,
      titulo: 'Coxinha',
      descricao: 'Salgado frito com base de trigo',
      valor: 10,
      quantidate: 1,
    });

    this.items.push({
      codigo: 3,
      titulo: 'Coca-cola',
      descricao: 'Refrigerante sabor cola',
      valor: 20,
      quantidate: 1,
    });
  }

  public back(): void {
    this.router.navigateByUrl('/menu');
  }

}
