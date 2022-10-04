import { Observable, of } from 'rxjs';
import { ZFormInputBase, ZFormInputText, ZFormInputTextArea, ZFormProvider, ZTranslateService } from 'zmaterial';

export class Form extends ZFormProvider {

  public constructor(private tService: ZTranslateService) { super(); }

  public getInputs(): Observable<ZFormInputBase<any>[]> {
    return of([
      new ZFormInputText({
        label: this.tService.t('frm_input_category_title'),
        key: 'titulo',
        type: 'text',
        maxlength: 45,
        layout: {
          cols: 100
        },
        icon: 'title',
        required: true,
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
      })
    ]);
  }

}
