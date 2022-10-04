import { Observable, of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ZFormInputBase, ZFormInputText, ZFormProvider, ZTranslateService } from 'zmaterial';

export class Form extends ZFormProvider {

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
        key: 'novaSenha',
        type: 'password',
        icon: 'lock',
        minlength: 5,
        required: true,
      })
    ])
  }

}
