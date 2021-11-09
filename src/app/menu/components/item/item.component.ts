import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

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

  public ratingArr: number[] = [];

  constructor(public api: ApiService) { }

  ngOnInit(): void {

    for (let index = 0; index < this.startCountStar; index++) {
      this.ratingArr.push(index);
    }

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



}
