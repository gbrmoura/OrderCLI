import { Component, EventEmitter, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { merge, of, Subject, Subscription } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap, tap } from 'rxjs/operators';
import { ZModalService, ZTranslateService } from 'zmaterial';
import { EApiCrud } from '../enum';
import { IAPIResponse } from '../interfaces';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'app-dashboard-master',
  templateUrl: './dashboard-master.component.html',
  styleUrls: ['./dashboard-master.component.scss']
})
export class DashboardMasterComponent implements OnInit {

  public orders: any[] = [];

  // Card List
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  public filterEvent: Subject<void> = new Subject();
  public filterStr = '';
  public refreshTable = new EventEmitter();
  private subscription = new Subscription();
  public isLoading = false;

  constructor(
    private api: ApiService,
    private tService: ZTranslateService,
    private ngZone: NgZone,
    private router: Router,
    private modal: ZModalService) { }

  ngOnInit(): void {
    this.isLoading = true;
  }

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
        return this.api.list({ TamanhoPagina: 30, NumeroPagina: 1, CampoPesquisa: this.filterStr }, EApiCrud.Pedido).pipe(
          catchError((err) => {
            this.modal.zModalTErrorLog({
              base: {
                title: this.tService.t('mdl_error'),
                description: this.tService.t('mdl_list_fail_dashboard'),
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

        return data.response.dados;
      }),
      catchError((err) => {
        this.modal.zModalTErrorLog({
          base: {
            title: this.tService.t('mdl_error'),
            description: this.tService.t('mdl_list_fail_dashboard'),
            btnCloseTitle: this.tService.t('btn_close')
          },
          btnLogTitle: this.tService.t('btn_details'),
          log: (err.error as IAPIResponse).message
        });

        return of([]);
      })
    ).subscribe((data) => {

      this.ngZone.run(() => {
        this.isLoading = false;
        this.orders = data;
      });

    });
  }

}
