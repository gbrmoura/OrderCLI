import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ZFormInputBase, ZFormInputText, ZFormProvider, ZModalService, ZTranslateService } from 'zmaterial';
import { AuthService } from '../services/auth.service';
import { switchMap } from 'rxjs/operators';
import { IAPIResponse } from '../interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends ZFormProvider implements OnInit {

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
        label: this.tService.t('frm_input_username'),
        key: 'login',
        type: 'text',
        icon: 'person',
        required: true,
      }),
      new ZFormInputText({
        label: this.tService.t('frm_input_password'),
        key: 'senha',
        type: 'password',
        icon: 'lock',
        required: true,
      })
    ])
  }

  public sendValue(value: any): void {

    this.auth.login(value).subscribe((res) => {
      this.auth.startSession(res.response);

      if (this.auth.session && this.auth.session.email) {
        window.location.href = '/crud/produto';
      } else {
        window.location.href = '/crud/categoria';
      }

    }, (err) => {
      this.modal.zModalTErrorLog({
        base: {
          title: this.tService.t('mdl_error'),
          description: this.tService.t('mdl_login_fail'),
          btnCloseTitle: this.tService.t('btn_close')
        },
        btnLogTitle: this.tService.t('btn_details'),
        log: (err.error as IAPIResponse).message
      });
    })

  }

}
