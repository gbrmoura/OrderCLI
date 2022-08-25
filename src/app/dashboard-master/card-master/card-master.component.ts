import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ZTranslateService } from 'zmaterial';

@Component({
  selector: 'card-master',
  templateUrl: './card-master.component.html',
  styleUrls: ['./card-master.component.scss']
})
export class CardMasterComponent implements OnInit {

  @Input() order: any;
  @Input() payment: any;

  constructor(
    public api: ApiService,
    private tService: ZTranslateService) { }

  ngOnInit(): void { }




}
