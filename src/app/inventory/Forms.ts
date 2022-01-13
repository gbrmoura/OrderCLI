import { Observable, of } from 'rxjs';
import { ZFormInputBase, ZFormInputText, ZFormInputTextArea, ZFormInputSelect, ZFormInputNumber, ZSearchResult, ZFormProvider, ZTranslateService } from 'zmaterial';
import { ApiService } from '../services/api.service';
import { EApiCrud } from '../enum';
import { map } from 'rxjs/operators';

export class Form extends ZFormProvider {

  public constructor(private tService: ZTranslateService, private api: ApiService) { super(); }

  public getInputs(): Observable<ZFormInputBase<any>[]> {
    return of([
      new ZFormInputSelect<string, any>({
        label: this.tService.t('frm_input_inventory_product'),
        key: 'produtoCodigo',
        icon: 'fastfood',
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
      }),
      new ZFormInputSelect<string, any>({
          label: this.tService.t('frm_input_inventory_type'),
          key: 'tipo',
          icon: 'category',
          required: true,
          
          searchItens: (value: string, numberOfItens: number): Observable<any> => {
            
            const search = (value || '');
            const results = [
              {
                title: 'Entrada',
                value: 'ENTRADA'
              },
              {
                title: 'Saída',
                value: 'SAIDA'
              }
            ];
            
            return of({
              items: results,
              totalItems: results.length
            });
          },
          firstDisplaySelect: (element: any) => element.title + '',
          layout: {
            cols: 50
          },
        }),
      new ZFormInputNumber({
        label: this.tService.t('frm_input_inventory_amount'),
        key: 'quantidade',
        layout: {
          cols: 50
        },
        icon: 'shopping_bag',
        required: true,
        min: 0,
      }),
      new ZFormInputTextArea({
        label: this.tService.t('frm_input_inventory_observation'),
        key: 'observacao',
        layout: {
          cols: 100
        },
        icon: 'notes',
      })
    ]);
  }

}
