import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() item: any;
  @Input() category: any;

  @Output() insertCart = new EventEmitter<any>();

  public badge = 0;
  public eventFavorite = false;

  constructor(
    public api: ApiService,
    private snackBar: MatSnackBar,
    private auth: AuthService,
    private shop: ShoppingService
  ) { }

  ngOnInit(): void {
    this.eventFavorite = this.item.favorito;
    var items = this.shop.getShopping(this.auth.session?.codigo);
    var item = items.filter(item => item.codigo === this.item.codigo);

    if (item && item.length > 0) {
      this.badge = item[0].quantidade;
    }
  }

  public modal(): void {
    this.insertCart.next(this.item);
  }

  public addItem(): void {

    if (this.badge < this.item.quantidade) {
      this.badge++;
    }

    this.insertCart.next(this.item);
  }

  public removeItem(): void {

    if (this.badge > this.item.quantidade) {
      this.badge--;
    }

    this.insertCart.next(this.item);
  }

  public favorite(item: any): void {
    if (!this.auth.session) {
      return;
    }

    this.eventFavorite = !this.eventFavorite;

    const object = {
      usuarioCodigo: this.auth.session.codigo,
      produtoCodigo: item.codigo,
      estado: this.eventFavorite
    };

    this.api.favorite(object).subscribe(() => {
      this.snackBar.open('Sucesso', '', { duration: 1500 });
    }, (err) => {
      this.snackBar.open('Error', '', { duration: 1500 });
    })

  }


}
