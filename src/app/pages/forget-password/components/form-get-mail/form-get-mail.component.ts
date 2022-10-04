
import { Router } from '@angular/router';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ZModalService, ZTranslateService } from 'zmaterial';
import { Form } from './Form';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { IAPIResponse } from 'src/app/interfaces';

@Component({
  selector: 'app-form-get-mail',
  templateUrl: './form-get-mail.component.html',
  styleUrls: ['./form-get-mail.component.scss']
})
export class FormGetMailComponent implements OnInit {

  public form = new Form(this.tService, this.api);
  public isLoading = false;

  @Output() email: any;

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
    this.isLoading = true;

    this.auth.forgetPassword(value).subscribe(() => {
      this.form.resetForm();
      this.isLoading = false;
      this.email = value.email;

      this.modal.zModalTSuccess({
        title: this.tService.t('mdl_success'),
        description: this.tService.t('mdl_add_success_forget_password'),
        btnCloseTitle: this.tService.t('btn_close')
      });

      this.router.navigate(['/password/change'], {
        queryParams: { email: value.email }
      });

    }, (err) => {
      this.isLoading = false;
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
