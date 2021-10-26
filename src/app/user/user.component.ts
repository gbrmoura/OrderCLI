import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ZFormInputBase, ZFormInputText, ZFormProvider, ZModalService, ZTranslateService } from 'zmaterial';
import { IAPIResponse } from '../interfaces';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends ZFormProvider implements OnInit {

  public isLoading = false;

  public constructor(
    private tService: ZTranslateService,
    private auth: AuthService,
    private modal: ZModalService,
    private router: Router
  ) { super() }

  public ngOnInit(): void { }

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

  public sendValue(value: any): void {
    this.isLoading = true;

    this.auth.registerUser(value).subscribe(() => {
      this.isLoading = false;

      this.resetForm();

      this.modal.zModalTSuccess({
        title: this.tService.t('mdl_success'),
        description: this.tService.t('mdl_user_success'),
        btnCloseTitle: this.tService.t('btn_close')
      });

      this.router.navigate(['/login']);

    }, (err) => {
      this.isLoading = false;

      this.modal.zModalTErrorLog({
        base: {
          title: this.tService.t('mdl_error'),
          description: this.tService.t('mdl_user_fail'),
          btnCloseTitle: this.tService.t('btn_close')
        },
        btnLogTitle: this.tService.t('btn_details'),
        log: (err.error as IAPIResponse).message
      });
    });

  }

  public back(): void {
    this.router.navigate(['/login']);
  }
}
