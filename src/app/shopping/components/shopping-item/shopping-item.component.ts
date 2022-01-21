import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.scss']
})
export class ShoppingItemComponent implements OnInit {

  @Input() item: any;

  @Output() shoppingCart = new EventEmitter<any>();

  public eventFavorite = false;

  constructor(
    public api: ApiService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.eventFavorite = this.item.favorito;
  }

  public addItem(): void {
    this.shoppingCart.next(this.item);
  }

  public removeItem(): void {
    this.shoppingCart.next(this.item);
  }

}
