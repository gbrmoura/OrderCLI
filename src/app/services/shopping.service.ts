import { iShopping } from './../interfaces/iShopping';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  private shopping: iShopping[] = [];
  private userShopping: iShopping[] = [];

  constructor() { }

  public isShoppingValid(): any {
    return this.shopping ? true : false;
  }

  public getShopping(user: number | any): iShopping[] {
    this.shopping = JSON.parse(String(localStorage.getItem('order_shopping')));

    if (this.shopping) {
      this.userShopping = this.shopping.filter(e => e.user === user);
    }

    return this.userShopping;
  }

  public setShopping(shopping: iShopping[]): void {
    localStorage.setItem('order_shopping', JSON.stringify(shopping));
    this.shopping = shopping;
  }

  public addShopping(shopping: iShopping, user: number | any): void {
    this.shopping = this.getShopping(user);

    if (this.shopping.find(e => e.codigo === shopping.codigo)) {
      this.shopping.forEach((item, index) => {
        if (item.codigo === shopping.codigo) {
          this.shopping[index].quantidade += 1;
        }
      });
    } else {
      this.shopping.push(shopping);
    }

    this.setShopping(this.shopping);
  }

  public minusShopping(shopping: iShopping, user: number | any): void {
    this.shopping = this.getShopping(user);

    if (this.shopping.find(e => e.codigo === shopping.codigo)) {
      this.shopping.forEach((item, index) => {
        if (item.codigo === shopping.codigo) {
          this.shopping[index].quantidade -= 1;
        }
      });
    } else {
      this.shopping.push(shopping);
    }

    this.setShopping(this.shopping);
  }


  public removeShopping(shopping: iShopping, user: number | any): void {
    this.shopping = this.getShopping(user);
    var index = this.shopping.findIndex(e => e.codigo === shopping.codigo);

    if (index > -1) {
      this.shopping.splice(index, 1);
    }

    this.setShopping(this.shopping);
  }

  public clearShopping(user: number | any): void {
    this.shopping = this.getShopping(user);
    this.shopping = this.shopping.filter(e => e.user !== user);
    this.setShopping(this.shopping);
  }

  public destroyShopping(): void {
    localStorage.removeItem('order_shopping');
    this.shopping = [];
  }

}
