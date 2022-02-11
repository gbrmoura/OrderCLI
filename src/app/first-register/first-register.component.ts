import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ZFormInputBase, ZFormInputText, ZFormProvider, ZModalService, ZTranslateService } from 'zmaterial';
import { AuthService } from '../services/auth.service';
import { IAPIResponse } from '../interfaces';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-first-register',
  templateUrl: './first-register.component.html',
  styleUrls: ['./first-register.component.scss']
})
export class FirstRegisterComponent extends ZFormProvider implements OnInit {

  public isLoading = false;

  public constructor(
    private tService: ZTranslateService,
    private auth: AuthService,
    private modal: ZModalService,
    private router: Router
  ) { super(); }

  public ngOnInit(): void { }

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
        layout: {
          cols: 50,
        },
        required: true,
      }),
      new ZFormInputText({
        label: this.tService.t('frm_input_password'),
        key: 'senha',
        type: 'password',
        maxlength: 40,
        minlength: 5,
        layout: {
          cols: 50,
        },
        icon: 'lock',
        required: true,
      }),
    ]);
  }

  public sendValue(value: any): void {
    this.isLoading = true;

    this.auth.firstRegister(value).subscribe(() => {
      this.isLoading = false;

      this.modal.zModalTSuccess({
        title: this.tService.t('mdl_success'),
        description: this.tService.t('mdl_fr_success'),
        btnCloseTitle: this.tService.t('btn_close')
      });

      this.router.navigate(['/login']);
    }, (err) => {
      this.isLoading = false;

      this.modal.zModalTErrorLog({
        base: {
          title: this.tService.t('mdl_error'),
          description: this.tService.t('mdl_fr_fail'),
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
