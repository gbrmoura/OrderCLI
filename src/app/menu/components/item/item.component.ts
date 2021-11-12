import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() item: any;
  @Input() category: any;

  @Output() insertCart = new EventEmitter<any>();

  public ratingStar = 0;
  public startCountStar = 5;
  public badge = 0;
  public eventFavorite = false;

  public ratingArr: number[] = [];

  constructor(
    public api: ApiService,
    private snackBar: MatSnackBar,
    private auth: AuthService
  ) { }

  ngOnInit(): void {

    for (let index = 0; index < this.startCountStar; index++) {
      this.ratingArr.push(index);
    }

    this.eventFavorite = this.item.favorito;

  }

  public updateStar(rating: number): void {
    console.log('New Rating: ', rating);

    this.ratingStar = rating;
  }

  public showIcon(index: number) {
    if (this.ratingStar >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  public addItem(): void {

    if (this.badge < this.item.quantidade) {
      this.badge++;
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
