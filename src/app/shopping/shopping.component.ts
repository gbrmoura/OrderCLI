import { Component, OnInit } from "@angular/core";
import { ZTranslateService } from 'zmaterial';
import { ApiService } from "../services/api.service";

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  public constructor(
    private tService: ZTranslateService,
    public api: ApiService) { }


  ngOnInit(): void {

  }

}
