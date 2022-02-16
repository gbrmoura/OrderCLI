import { FormChange } from '../change-password/FormChange';
import { ShoppingService } from './../services/shopping.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ZFormInputBase, ZFormInputText, ZFormProvider, ZModalService, ZTranslateService } from 'zmaterial';
import { AuthService } from '../services/auth.service';
import { IAPIResponse } from '../interfaces';
import { ApiService } from '../services/api.service';
import { ETabList } from '../enum';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  // Form Change Password
  public formChange = new FormChange(this.tService, this.api);
  public isChangeLoading = false;


  public constructor(
    private tService: ZTranslateService,
    private auth: AuthService,
    private api: ApiService,
    private modal: ZModalService,
    private router: Router,
    private shop: ShoppingService
    ) { }

  public ngOnInit(): void {

  }

  public sendValue(value: any): void {
    this.isChangeLoading = true;

    // TODO: enviar novos parametros
    this.auth.changePassword({...value, email: ""}).subscribe(() => {
      this.formChange.resetForm();
      this.isChangeLoading = false;

      this.modal.zModalTSuccess({
        title: this.tService.t('mdl_success'),
        description: this.tService.t('mdl_add_success_change_password'),
        btnCloseTitle: this.tService.t('btn_close')
      });

    }, (err) => {
      this.isChangeLoading = false;

      this.modal.zModalTErrorLog({
        base: {
          title: this.tService.t('mdl_error'),
          description: this.tService.t('mdl_add_fail_change_password'),
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
