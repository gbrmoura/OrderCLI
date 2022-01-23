import { AuthService } from 'src/app/services/auth.service';
import { ShoppingService } from './../services/shopping.service';
import { EApiCrud } from './../enum/EAPI';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ZTranslateService, ZModalService } from 'zmaterial';
import { ApiService } from "../services/api.service";

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  public isLoading = false;

  public items: any[] = [];
  public metodos: any[] = [];
  public totalValue: any;

  public constructor(
    private tService: ZTranslateService,
    public api: ApiService,
    private router: Router,
    private shop: ShoppingService,
    private auth: AuthService,
    private modal: ZModalService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    if (this.shop.isShoppingValid()) {{
      this.items = this.shop.getShopping(this.auth.session?.codigo);
      this.totalValue = this.items.reduce((acc, item) => acc + item.valor * item.quantidade, 0).toFixed(2);
    }}

    this.isLoading = false;
  }

  public back(): void {
    this.router.navigateByUrl('/menu');
  }

  public checkout(): void {
    if (this.items.length <= 0) {
      this.modal.zModalTWarning({
        title: this.tService.t('mdl_warning'),
        description: this.tService.t('mdl_shopping_warning'),
        btnCloseTitle: this.tService.t('btn_close'),
      });
      this.router.navigateByUrl('/menu');
    } else {
      this.router.navigateByUrl('/shopping/checkout');
    }
  }

  public removeItem(item: any): void {
    this.shop.removeShopping(item, this.auth.session?.codigo);
    this.updateScreen();
  }

  public plusItem(item: any): void {
    this.api.get(item.codigo, EApiCrud.Produto).subscribe(
      (data: any) => {
        if (data.response && item.quantidade < data.response.quantidade) {
          this.shop.addShopping(item, this.auth.session?.codigo);
          this.updateScreen();
        }
      }, (error: any) => {
        console.error(error);
      }
    );
  }

  public minusItem(item: any): void {
    if (item.quantidade >= 2) {
      this.shop.minusShopping(item, this.auth.session?.codigo);
      this.updateScreen();
    }
  }

  private updateScreen(): void {
    this.items = this.shop.getShopping(this.auth.session?.codigo);
    this.totalValue = this.items.reduce((acc, item) => acc + item.valor * item.quantidade, 0).toFixed(2);;
  }

}
