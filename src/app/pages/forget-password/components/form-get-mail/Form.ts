import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { ZFormInputBase, ZFormInputText, ZFormProvider, ZTranslateService } from 'zmaterial';


export class Form extends ZFormProvider {

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
