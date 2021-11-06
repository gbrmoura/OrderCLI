import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ZFormInputBase, ZFormInputNumber, ZFormInputSelect, ZFormProvider, ZModalService, ZSearchResult, ZTranslateService } from 'zmaterial';
import { EApiCrud } from '../enum';
import { IAPIResponse } from '../interfaces';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent extends ZFormProvider implements OnInit {

  public isLoading = false;

  constructor(
    private api: ApiService,
    private tService: ZTranslateService,
    private modal: ZModalService
  ) { super(); }

  ngOnInit(): void { }

  getInputs(): Observable<ZFormInputBase<any>[]> {
    return of([
      new ZFormInputSelect<string, any>({
        label: this.tService.t('itn_produtct'),
        key: 'produtoCodigo',
        icon: 'sell',
        required: true,
        searchItens: (value: string, numberOfItens: number): Observable<ZSearchResult<any>> => {

          const search = (value || '');

          return this.api.list({ TamanhoPagina: 15, NumeroPagina: 1, CampoPesquisa: search }, EApiCrud.Produto).pipe(
            map((result) => {

              if (!result.response) {
                return {
                  items: [],
                  totalItems: 0
                };
              }

              return {
                items: result.response.dados,
                totalItems: result.response.numeroRegistros
              }

            })
          );

        },
        firstDisplaySelect: (element: any) => element.titulo + '',
        secondaryDisplaySelect: (element: any) => element.categoria.titulo + ''
      }),
      new ZFormInputNumber({
        label: this.tService.t('frm_input_inventory_amount'),
        key: 'quantidade',
        icon: 'view_agenda',
        required: true,
        min: 0,
        step: 1,
      })
    ]);
  }

  public sendValue(value: any): void {
    const obj = {
      produtoCodigo: value.produtoCodigo.codigo,
      quantidade: value.quantidade
    }

    this.isLoading = true;

    this.api.insert(obj, EApiCrud.Estoque).subscribe(() => {
      this.resetForm();
      this.isLoading = false;

      this.modal.zModalTSuccess({
        title: this.tService.t('mdl_success'),
        description: this.tService.t('mdl_add_success_inventory'),
        btnCloseTitle: this.tService.t('btn_close')
      });
    }, (err) => {
      this.isLoading = false;

      this.modal.zModalTErrorLog({
        base: {
          title: this.tService.t('mdl_error'),
          description: this.tService.t('mdl_add_fail_inventory'),
          btnCloseTitle: this.tService.t('btn_close')
        },
        btnLogTitle: this.tService.t('btn_details'),
        log: (err.error as IAPIResponse).message
      });
    })
  }

}
