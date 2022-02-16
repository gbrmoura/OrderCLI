import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ZFormInputBase, ZFormInputFile, ZFormInputNumber, ZFormInputSelect, ZFormInputText, ZFormInputTextArea, ZFormProvider, ZSearchResult, ZTranslateService } from 'zmaterial';
import { EApiCrud } from '../enum';
import { ApiService } from '../services/api.service';

export class FormChange extends ZFormProvider {

  public constructor(private tService: ZTranslateService, private api: ApiService) { super(); }

  public getInputs(): Observable<ZFormInputBase<any>[]> {
    return of([
      new ZFormInputText({
        label: this.tService.t('frm_input_token'),
        key: 'token',
        type: 'text',
        icon: 'lock',
        maxlength: 8,
        required: true,
      }),
      new ZFormInputText({
        label: this.tService.t('frm_input_password'),
        key: 'senha',
        type: 'password',
        icon: 'lock',
        minlength: 5,
        required: true,
      })
    ])
  }

}
