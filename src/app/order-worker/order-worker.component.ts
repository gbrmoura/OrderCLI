import { AuthService } from './../services/auth.service';
import { AfterViewInit, Component, EventEmitter, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { merge, of, Subject, Subscription } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap, take, tap } from 'rxjs/operators';
import { ZModalService, ZTranslateService } from 'zmaterial';
import { EApiCrud, ETabList } from '../enum';
import { IAPIResponse } from '../interfaces';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-order-worker',
  templateUrl: './order-worker.component.html',
  styleUrls: ['./order-worker.component.scss']
})
export class OrderWorkerComponent implements OnInit, AfterViewInit {

  // Global
  public currentTab = 0;
  public privilege = 0;

  // Tab List
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  public filterEvent: Subject<void> = new Subject();
  public filterStr = '';
  public refreshTable = new EventEmitter();
  public dataSource: Subject<any[]> = new Subject();
  public displayedColumns = ['codigo', 'data', 'metodoPagamento', 'usuario', 'status', 'actions'];
  public resultLength = 0;
  public isLoadingList = true;
  private subscription = new Subscription();

  // Tab View
  public orderData: any;
  public isLoadingView = true;

  constructor(
    private tService: ZTranslateService,
    private modal: ZModalService,
    public api: ApiService,
    private ngZone: NgZone,
    private router: Router,
  ) { }

  ngOnInit(): void {

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
          CampoPesquisa: this.filterStr}, EApiCrud.Pedido).pipe(
          catchError((err) => {
            this.modal.zModalTErrorLog({
              base: {
                title: this.tService.t('mdl_error'),
                description: this.tService.t('mdl_order_user_error_list'),
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
            description: this.tService.t('mdl_order_user_error_list'),
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

  public checkOrder(value: any): void {
    this.modal.zModalTWarningConfirm({
      base: {
        btnCloseTitle: this.tService.t('btn_close'),
        description: this.tService.t('mdl_check_question_order_user') + value.codigo + '?',
        title: this.tService.t('mdl_warning'),
      },
      btnConfirmTitle: this.tService.t('btn_confirm')
    }).pipe(
      take(1),
      switchMap((res) => {

        if (res) {
          return this.api.withdraw(value.codigo);
        }

        return of(false);

      })
    ).subscribe((res) => {

      if (res) {
        this.modal.zModalTSuccess({
          title: this.tService.t('mdl_success'),
          description: this.tService.t('mdl_check_success_order_user'),
          btnCloseTitle: this.tService.t('btn_close')
        });
        this.refreshTable.next();
      }
    }, (err) => {

      this.modal.zModalTErrorLog({
        base: {
          title: this.tService.t('mdl_error'),
          description: this.tService.t('mdl_check_fail_order_user'),
          btnCloseTitle: this.tService.t('btn_close')
        },
        btnLogTitle: this.tService.t('btn_details'),
        log: (err.error as IAPIResponse).message
      });

    });
  }

  public viewRow(value: any): void {
    this.isLoadingView = true;

    this.api.get(value.codigo, EApiCrud.Pedido).subscribe((data) => {
      this.ngZone.run(() => {
        this.isLoadingView = false;
        this.orderData = data.response;
        this.currentTab = 1;
      })

    }, (err) => {
      this.isLoadingView = false;
      this.currentTab = 0;
      this.modal.zModalTErrorLog({
        base: {
          title: this.tService.t('mdl_error'),
          description: this.tService.t('mdl_order_user_error_view'),
          btnCloseTitle: this.tService.t('btn_close')
        },
        btnLogTitle: this.tService.t('btn_details'),
        log: (err.error as IAPIResponse).message
      });
    });


  }

  public cancelOrder(value: any): void {

    this.modal.zModalTWarningConfirm({
      base: {
        btnCloseTitle: this.tService.t('btn_close'),
        description: this.tService.t('mdl_delete_question_order_user') + value.codigo + '?',
        title: this.tService.t('mdl_warning'),
      },
      btnConfirmTitle: this.tService.t('btn_confirm')
    }).pipe(
      take(1),
      switchMap((res) => {

        if (res) {
          return this.api.cancel(value.codigo);
        }

        return of(false);

      })
    ).subscribe((res) => {

      if (res) {
        this.modal.zModalTSuccess({
          title: this.tService.t('mdl_success'),
          description: this.tService.t('mdl_delete_success_order_user'),
          btnCloseTitle: this.tService.t('btn_close')
        });
        this.refreshTable.next();
      }
    }, (err) => {

      this.modal.zModalTErrorLog({
        base: {
          title: this.tService.t('mdl_error'),
          description: this.tService.t('mdl_delete_fail_order_user'),
          btnCloseTitle: this.tService.t('btn_close')
        },
        btnLogTitle: this.tService.t('btn_details'),
        log: (err.error as IAPIResponse).message
      });

    });
  }

  public changeTab(event: MatTabChangeEvent): void {
    this.currentTab = event.index;
    if (event.index === ETabList.List) {
      this.refreshTable.next();
    }
  }

}
