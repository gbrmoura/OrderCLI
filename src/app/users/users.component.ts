import { Component, OnInit } from '@angular/core';
import { ZModalService, ZTranslateService } from 'zmaterial';
import { IAPIResponse } from '../interfaces';
import { AuthService } from '../services/auth.service';
import { FormEmployeen, FormUser } from './forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public formUser = new FormUser(this.tService);
  public formEmployeen = new FormEmployeen(this.tService);
  public loadingUser = false;
  public loadingEmployeen = false;

  public constructor(
    private tService: ZTranslateService,
    private auth: AuthService,
    private modal: ZModalService
  ) { }

  public ngOnInit(): void { }

  public changeTab(): void {
    this.formUser.resetForm();
    this.formEmployeen.resetForm();
  }

  public sendUser(value: any): void {
    this.loadingUser = true;

    this.auth.registerUser(value).subscribe(() => {
      this.loadingUser = false;

      this.formUser.resetForm();

      this.modal.zModalTSuccess({
        title: this.tService.t('mdl_success'),
        description: this.tService.t('mdl_user_success'),
        btnCloseTitle: this.tService.t('btn_close')
      });
    }, (err) => {
      this.loadingUser = false;

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

  public sendEmployeen(value: any): void {
    this.loadingEmployeen = true;

    this.auth.registerEmployee({...value, previlegio: Number(value.previlegio.code)}).subscribe(() => {
      this.loadingEmployeen = false;

      this.formEmployeen.resetForm();

      this.modal.zModalTSuccess({
        title: this.tService.t('mdl_success'),
        description: this.tService.t('mdl_employeen_success'),
        btnCloseTitle: this.tService.t('btn_close')
      });
    }, (err) => {
      this.loadingEmployeen = false;

      this.modal.zModalTErrorLog({
        base: {
          title: this.tService.t('mdl_error'),
          description: this.tService.t('mdl_employeen_fail'),
          btnCloseTitle: this.tService.t('btn_close')
        },
        btnLogTitle: this.tService.t('btn_details'),
        log: (err.error as IAPIResponse).message
      });
    });
  }
}
