import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ZFormInputBase, ZFormInputFile, ZFormInputNumber, ZFormInputSelect, ZFormInputText, ZFormInputTextArea, ZFormProvider, ZSearchResult, ZTranslateService } from 'zmaterial';
import { EApiCrud } from '../enum';
import { ApiService } from '../services/api.service';

export class FormForget extends ZFormProvider {

  public constructor(private tService: ZTranslateService, private api: ApiService) { super(); }

  public getInputs(): Observable<ZFormInputBase<any>[]> {
    return of([
      new ZFormInputText({
        label: this.tService.t('frm_input_email'),
        key: 'email',
        type: 'text',
        icon: 'mail',
        maxlength: 245,
        required: true,
      })
    ])
  }

}
