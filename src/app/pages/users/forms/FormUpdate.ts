import { Observable, of } from 'rxjs';
import { ZFormInputBase, ZFormInputSelect, ZFormInputText, ZFormProvider, ZSearchResult, ZTranslateService } from 'zmaterial';

export class FormUpdate extends ZFormProvider {

  public constructor(
    private tService: ZTranslateService
  ) { super(); }

  public getInputs(): Observable<ZFormInputBase<any>[]> {
    return of([
      new ZFormInputText({
        label: this.tService.t('frm_input_name'),
        key: 'nome',
        type: 'text',
        maxlength: 115,
        icon: 'assignment_ind',
        required: true,
      }),
      new ZFormInputText({
        label: this.tService.t('frm_input_email'),
        key: 'email',
        type: 'email',
        maxlength: 115,
        icon: 'email',
        required: true,
      }),
      new ZFormInputText({
        label: this.tService.t('frm_input_username'),
        key: 'login',
        type: 'text',
        maxlength: 50,
        icon: 'person',
        required: true,
      }),
      new ZFormInputSelect<string, any>({
        label: this.tService.t('frm_input_employeen_privilege'),
        key: 'previlegio',
        icon: 'military_tech',
        required: true,
        debounceTime: 1500,
        searchItens: (value: string, numberOfItens: number): Observable<ZSearchResult<any>> => {

          const search = (value || '');
          const zsearch: ZSearchResult<any> = {
            totalItems: 3,
            items: [
              { code: '0', desc: this.tService.t('frm_input_select_master') },
              { code: '1', desc: this.tService.t('frm_input_select_admin') },
              { code: '2', desc: this.tService.t('frm_input_select_employeen') }
            ]
          };

          return of(zsearch);
        },
        firstDisplaySelect: (element: any) => element.desc,
      }),
    ]);
  }

}
