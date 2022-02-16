import { FormChange } from '../change-password/FormChange';
import { ShoppingService } from './../services/shopping.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ZFormInputBase, ZFormInputText, ZFormProvider, ZModalService, ZTranslateService } from 'zmaterial';
import { AuthService } from '../services/auth.service';
import { IAPIResponse } from '../interfaces';
import { ApiService } from '../services/api.service';
import { FormForget } from './FormForget';
import { ETabList } from '../enum';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  // Form Forget Password
  public formForget = new FormForget(this.tService, this.api);
  public isForgetLoading = false;

  public constructor(
    private tService: ZTranslateService,
    private auth: AuthService,
    private api: ApiService,
    private modal: ZModalService,
    private router: Router,
    ) { }

  public ngOnInit(): void {

  }

  public sendValue(value: any): void {
    this.isForgetLoading = true;

    this.auth.forgetPassword(value).subscribe(() => {
      this.formForget.resetForm();
      this.isForgetLoading = false;

      this.modal.zModalTSuccess({
        title: this.tService.t('mdl_success'),
        description: this.tService.t('mdl_add_success_forget_password'),
        btnCloseTitle: this.tService.t('btn_close')
      });

      this.router.navigate(['/password/change']);

    }, (err) => {
      this.isForgetLoading = false;
      this.modal.zModalTErrorLog({
        base: {
          title: this.tService.t('mdl_error'),
          description: this.tService.t('mdl_add_fail_forget_password'),
          btnCloseTitle: this.tService.t('btn_close')
        },
        btnLogTitle: this.tService.t('btn_details'),
        log: (err.error as IAPIResponse).message
      });
      this.router.navigate(['/login']);
    });
  }

  public cancel(): void {
    this.router.navigate(['/login']);
  }

}
