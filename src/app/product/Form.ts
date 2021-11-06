import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ZFormInputBase, ZFormInputFile, ZFormInputNumber, ZFormInputSelect, ZFormInputText, ZFormInputTextArea, ZFormProvider, ZSearchResult, ZTranslateService } from 'zmaterial';
import { EApiCrud } from '../enum';
import { ApiService } from '../services/api.service';

export class Form extends ZFormProvider {

  public constructor(private tService: ZTranslateService, private api: ApiService) { super(); }

  public getInputs(): Observable<ZFormInputBase<any>[]> {
    return of([
      new ZFormInputFile({
        label: this.tService.t('frm_input_product_image'),
        key: 'imagem',
        accept: 'image/*',
      }),
      new ZFormInputSelect<string, any>({
        label: this.tService.t('itn_category'),
        key: 'categoriaCodigo',
        icon: 'category',
        required: true,
        searchItens: (value: string, numberOfItens: number): Observable<ZSearchResult<any>> => {

          const search = (value || '');

          return this.api.list({ TamanhoPagina: 15, NumeroPagina: 1, CampoPesquisa: search }, EApiCrud.Categoria).pipe(
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
      new ZFormInputText({
        label: this.tService.t('frm_input_category_title'),
        key: 'titulo',
        type: 'text',
        maxlength: 45,
        layout: {
          cols: 50
        },
        icon: 'title',
        required: true,
      }),
      new ZFormInputNumber({
        label: this.tService.t('frm_input_product_price'),
        key: 'valor',
        layout: {
          cols: 50
        },
        icon: 'attach_money',
        required: true,
        min: 0,
      }),
      new ZFormInputTextArea({
        label: this.tService.t('frm_input_category_description'),
        key: 'descricao',
        maxLength: 245,
        layout: {
          cols: 100
        },
        icon: 'info',
        required: false,
      }),

    ]);
  }

}
