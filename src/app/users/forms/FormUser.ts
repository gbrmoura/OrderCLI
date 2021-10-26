import { Observable, of } from 'rxjs';
import { ZFormInputBase, ZFormInputText, ZFormProvider, ZTranslateService } from 'zmaterial';

export class FormUser extends ZFormProvider {

  public constructor(
    private tService: ZTranslateService
  ) { super(); }

  public getInputs(): Observable<ZFormInputBase<any>[]> {
    return of([
      new ZFormInputText({
        label: this.tService.t('frm_input_user_name'),
        key: 'nome',
        type: 'text',
        maxlength: 115,
        layout: {
          cols: 50
        },
        icon: 'person',
        required: true,
      }),
      new ZFormInputText({
        label: this.tService.t('frm_input_user_lastname'),
        key: 'sobrenome',
        type: 'text',
        maxlength: 145,
        layout: {
          cols: 50
        },
        icon: 'badge',
        required: true,
      }),
      new ZFormInputText({
        label: this.tService.t('frm_input_user_code'),
        key: 'prontuario',
        type: 'text',
        maxlength: 14,
        icon: 'subtitles',
        required: false,
      }),
      new ZFormInputText({
        label: this.tService.t('frm_input_user_email'),
        key: 'email',
        type: 'email',
        maxlength: 245,
        icon: 'email',
        layout: {
          cols: 50
        },
        required: true,
      }),
      new ZFormInputText({
        label: this.tService.t('frm_input_user_password'),
        key: 'senha',
        type: 'password',
        minlength: 5,
        icon: 'lock',
        layout: {
          cols: 50
        },
        required: true,
      }),
    ]);
  }

}
