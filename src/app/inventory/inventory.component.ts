import { Component, EventEmitter, OnInit, OnDestroy, AfterViewInit, ViewChild, NgZone } from '@angular/core';
import { merge, Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap, tap } from 'rxjs/operators';
import { ZFormInputBase, ZFormInputNumber, ZFormInputSelect, ZFormProvider, ZModalService, ZSearchResult, ZTranslateService } from 'zmaterial';
import { EApiCrud, ETabList } from '../enum';
import { IAPIResponse } from '../interfaces';
import { ApiService } from '../services/api.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Form } from './Forms';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, AfterViewInit, OnDestroy {

  // Global
  public currentTab = ETabList.Add

  // Form Add
  public formInventoryAdd = new Form(this.tService, this.api);
  public isLoadingAdd = false;

  // Form List
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  public filterStr = '';
  public filterEvent: Subject<void> = new Subject();
  public dataSource: Subject<any[]> = new Subject();
  public displayedColumns = ['codigo', 'produto', 'quantidade', 'funcionario', 'observacao'];
  public resultLength = 0;
  public isLoadingList = true;

  // Others
  public refreshTable = new EventEmitter();
  private subscription = new Subscription();

  public isLoading = false;

  constructor(
    private api: ApiService,
    private tService: ZTranslateService,
    private modal: ZModalService,
    private ngZone: NgZone
  ) {  }

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
          CampoPesquisa: this.filterStr}, EApiCrud.Estoque).pipe(
          catchError((err) => {
            this.modal.zModalTErrorLog({
              base: {
                title: this.tService.t('mdl_error'),
                description: this.tService.t('mdl_list_fail_inventory'),
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
            description: this.tService.t('mdl_list_fail_inventory'),
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

  public insert(value: any): void {
    this.isLoadingAdd = true;

    const payload = {
      tipo: value.tipo.value,
      quantidade: value.quantidade,
      produtoCodigo: value.produtoCodigo.codigo,
      observacao: value.observacao,
    }

    this.api.control(payload).subscribe(() => {
      this.formInventoryAdd.resetForm();
      this.isLoadingAdd = false;

      this.modal.zModalTSuccess({
        title: this.tService.t('mdl_success'),
        description: this.tService.t('mdl_add_success_inventory'),
        btnCloseTitle: this.tService.t('btn_close')
      });

      this.currentTab = ETabList.List;
    }, (err) => {
      this.isLoadingAdd = false;

      this.modal.zModalTErrorLog({
        base: {
          title: this.tService.t('mdl_error'),
          description: this.tService.t('mdl_add_fail_inventory'),
          btnCloseTitle: this.tService.t('btn_close')
        },
        btnLogTitle: this.tService.t('btn_details'),
        log: (err.error as IAPIResponse).message
      });

    })
  }

  public changeTab(event: MatTabChangeEvent): void {

    this.currentTab = event.index;

    if (event.index === ETabList.List) {
      this.refreshTable.next();
      this.formInventoryAdd.resetForm();
    }

  }

}
