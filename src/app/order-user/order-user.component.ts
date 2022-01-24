import { AfterViewInit, Component, EventEmitter, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { merge, of, Subject, Subscription } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap, tap } from 'rxjs/operators';
import { ZModalService, ZTranslateService } from 'zmaterial';
import { EApiCrud, ETabList } from '../enum';
import { IAPIResponse } from '../interfaces';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order-user.component.html',
  styleUrls: ['./order-user.component.scss']
})
export class OrderUserComponent implements OnInit, AfterViewInit {

  // Global
  public currentTab = 0;

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
  private orderCode: any = 0;

  constructor(
    private tService: ZTranslateService,
    private modal: ZModalService,
    private api: ApiService,
    private ngZone: NgZone
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

  public viewRow(value: any): void {
    this.orderCode = value.codigo;
    this.currentTab = 1;
  }

  public changeTab(event: MatTabChangeEvent): void {
    this.currentTab = event.index;
    if (event.index === ETabList.List) {
      this.refreshTable.next();
    }
  }

}
