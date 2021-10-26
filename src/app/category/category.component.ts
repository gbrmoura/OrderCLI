import { ApiService } from './../services/api.service';
import { FormCategory } from './FormCategory';
import { Component, OnInit } from '@angular/core';
import { ZModalService, ZTranslateService } from 'zmaterial';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { IAPIResponse } from '../interfaces';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public formCategory = new FormCategory(this.tService);
  public isLoadingAdd = false;

  constructor(
    private tService: ZTranslateService,
    private modal: ZModalService,
    private api: ApiService
  ) { }

  ngOnInit(): void { }

  public changeTab(event: MatTabChangeEvent): void {
    console.log('Trocou de Aba: ', event);
  }

  public insert(value: any): void {
    this.isLoadingAdd = true;

    this.api.addCategory(value).subscribe(() => {
      this.formCategory.resetForm();
      this.isLoadingAdd = false;

      this.modal.zModalTSuccess({
        title: this.tService.t('mdl_success'),
        description: this.tService.t('mdl_add_success_category'),
        btnCloseTitle: this.tService.t('btn_close')
      });

    }, (err) => {
      this.isLoadingAdd = false;

      this.modal.zModalTErrorLog({
        base: {
          title: this.tService.t('mdl_error'),
          description: this.tService.t('mdl_add_fail_category'),
          btnCloseTitle: this.tService.t('btn_close')
        },
        btnLogTitle: this.tService.t('btn_details'),
        log: (err.error as IAPIResponse).message
      });

    });

  }

}
