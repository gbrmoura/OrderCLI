import { ApiService } from './../services/api.service';
import { Form } from './Form';
import { AfterViewInit, Component, EventEmitter, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ZModalService, ZTranslateService } from 'zmaterial';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { IAPIResponse } from '../interfaces';
import { merge, of, Subject, Subscription } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap, take, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { EApiCrud, ETabList } from '../enum';

@Component({
  selector: 'app-method-payment',
  templateUrl: './method-payment.component.html',
  styleUrls: ['./method-payment.component.scss']
})
export class MethodPaymentComponent implements OnInit, AfterViewInit, OnDestroy {

  // Global
  public currentTab = ETabList.Add

  // Form Register
  public formCategoryAdd = new Form(this.tService);
  public isLoadingAdd = false;

  // Table List
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  public filterEvent: Subject<void> = new Subject();
  public filterStr = '';
  public refreshTable = new EventEmitter();
  public dataSource: Subject<any[]> = new Subject();
  public displayedColumns = ['codigo', 'titulo', 'actions'];
  public resultLength = 0;
  public isLoadingList = true;
  private subscription = new Subscription();

  // Form Update
  public formCategoryUpdate = new Form(this.tService);
  public isLoadingUpdate = false;
  public updateCode = '';

  constructor(
    private tService: ZTranslateService,
    private modal: ZModalService,
    private api: ApiService,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    const filterChange$ = this.filterEvent.pipe(
      debounceTime(500)
    );

    const changesEvent$ = merge(filterChange$).pipe(
      tap(() => this.paginator.pageIndex = 0)
    );

    this.subscription = merge(changesEvent$, this.paginator.page, this.refreshTable).pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingList = true;

        return this.api.list({
          TamanhoPagina: this.paginator.pageSize,
          NumeroPagina: this.paginator.pageIndex + 1,
          CampoPesquisa: this.filterStr
        }, EApiCrud.MetodoPagamento).pipe(
          catchError((err) => {
            this.modal.zModalTErrorLog({
              base: {
                title: this.tService.t('mdl_error'),
                description: this.tService.t('mdl_list_fail_methodPayment'),
                btnCloseTitle: this.tService.t('btn_close')
              },
              btnLogTitle: this.tService.t('btn_details'),
              log: (err.error as IAPIResponse).message
            });

            return of((err.error as IAPIResponse));
          })
        );
      }),
      map((data) => {
        if (!data.response) {
          return [];
        }

        this.resultLength = data.response.numeroRegistros;

        return data.response.dados;
      }),
      catchError((err) => {
        this.modal.zModalTErrorLog({
          base: {
            title: this.tService.t('mdl_error'),
            description: this.tService.t('mdl_list_fail_methodPayment'),
            btnCloseTitle: this.tService.t('btn_close')
          },
          btnLogTitle: this.tService.t('btn_details'),
          log: (err.error as IAPIResponse).message
        });

        return of([]);
      })
    ).subscribe((data) => {

      this.ngZone.run(() => {
        this.isLoadingList = false;
        this.dataSource.next(data);
      });

    });
  }

  public changeTab(event: MatTabChangeEvent): void {

    this.currentTab = event.index;

    if (event.index === ETabList.List) {
      this.refreshTable.next();
      this.formCategoryAdd.resetForm();
      this.formCategoryUpdate.resetForm();
    } else if (event.index === ETabList.Update) {
      this.formCategoryAdd.resetForm();
    }

  }

  public deleteRow(value: any): void {
    this.modal.zModalTWarningConfirm({
      base: {
        btnCloseTitle: this.tService.t('btn_close'),
        description: this.tService.t('mdl_delete_question_methodPayment') + value.titulo,
        title: this.tService.t('mdl_warning'),
      },
      btnConfirmTitle: this.tService.t('btn_confirm')
    }).pipe(
      take(1),
      switchMap((res) => {

        if (res) {
          return this.api.delete(value, EApiCrud.MetodoPagamento);
        }

        return of(false);

      })
    ).subscribe((res) => {

      if (res) {
        this.modal.zModalTSuccess({
          title: this.tService.t('mdl_success'),
          description: this.tService.t('mdl_delete_success_methodPayment'),
          btnCloseTitle: this.tService.t('btn_close')
        });

        this.refreshTable.next();
      }

    }, (err) => {

      this.modal.zModalTErrorLog({
        base: {
          title: this.tService.t('mdl_error'),
          description: this.tService.t('mdl_delete_fail_methodPayment'),
          btnCloseTitle: this.tService.t('btn_close')
        },
        btnLogTitle: this.tService.t('btn_details'),
        log: (err.error as IAPIResponse).message
      });

    });
  }

  public updateRow(value: any): void {
    this.updateCode = value.codigo
    this.formCategoryUpdate.setValueForm({ titulo: value.titulo, descricao: value.descricao });

    this.currentTab = ETabList.Update;
  }

  public insert(value: any): void {
    this.isLoadingAdd = true;

    this.api.insert(value, EApiCrud.MetodoPagamento).subscribe(() => {
      this.formCategoryAdd.resetForm();
      this.isLoadingAdd = false;

      this.modal.zModalTSuccess({
        title: this.tService.t('mdl_success'),
        description: this.tService.t('mdl_add_success_methodPayment'),
        btnCloseTitle: this.tService.t('btn_close')
      });

    }, (err) => {
      this.isLoadingAdd = false;

      this.modal.zModalTErrorLog({
        base: {
          title: this.tService.t('mdl_error'),
          description: this.tService.t('mdl_add_fail_methodPayment'),
          btnCloseTitle: this.tService.t('btn_close')
        },
        btnLogTitle: this.tService.t('btn_details'),
        log: (err.error as IAPIResponse).message
      });

    });

  }

  public update(value: any): void {
    this.isLoadingUpdate = true;

    this.api.update({ ...value, codigo: this.updateCode }, EApiCrud.MetodoPagamento).subscribe(() => {
      this.formCategoryUpdate.resetForm();
      this.isLoadingUpdate = false;

      this.modal.zModalTSuccess({
        title: this.tService.t('mdl_success'),
        description: this.tService.t('mdl_update_success_methodPayment'),
        btnCloseTitle: this.tService.t('btn_close')
      });

      this.currentTab = ETabList.List;
    }, (err) => {
      this.isLoadingUpdate = false;

      this.modal.zModalTErrorLog({
        base: {
          title: this.tService.t('mdl_error'),
          description: this.tService.t('mdl_update_fail_methodPayment'),
          btnCloseTitle: this.tService.t('btn_close')
        },
        btnLogTitle: this.tService.t('btn_details'),
        log: (err.error as IAPIResponse).message
      });

    });

  }

}
