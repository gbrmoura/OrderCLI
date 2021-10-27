import { AfterViewInit, Component, EventEmitter, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { merge, of, Subject, Subscription } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap, take, tap } from 'rxjs/operators';
import { ZModalService, ZTranslateService } from 'zmaterial';
import { ETabList } from '../enum';
import { IAPIResponse } from '../interfaces';
import { ApiService } from '../services/api.service';
import { FormProduct } from './FormProduct';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit, OnDestroy {

// Global
public currentTab = ETabList.Add

// Form Register
public formAdd = new FormProduct(this.tService, this.api);
public isLoadingAdd = false;

// Table List
@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

public filterEvent: Subject<void> = new Subject();
public filterStr = '';
public refreshTable = new EventEmitter();
public dataSource: Subject<any[]> = new Subject();
public displayedColumns = ['titulo', 'descricao', 'actions'];
public resultLength = 0;
public isLoadingList = true;
private subscription = new Subscription();

// Form Update
public formUpdate = new FormProduct(this.tService, this.api);
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

      return this.api.listProduct({
        TamanhoPagina: this.paginator.pageSize,
        NumeroPagina: this.paginator.pageIndex + 1,
      });
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
          description: this.tService.t('mdl_list_fail_product'),
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
    this.formAdd.resetForm();
    this.formUpdate.resetForm();
  } else if (event.index === ETabList.Update) {
    this.formAdd.resetForm();
  }

}

public deleteRow(value: any): void {
  this.modal.zModalTWarningConfirm({
    base: {
      btnCloseTitle: this.tService.t('btn_close'),
      description: this.tService.t('mdl_delete_question_product') + value.titulo,
      title: this.tService.t('mdl_warning'),
    },
    btnConfirmTitle: this.tService.t('btn_confirm')
  }).pipe(
    take(1),
    switchMap((res) => {

      if (res) {
        return this.api.deleteCategory(value);
      }

      return of(false);

    })
  ).subscribe((res) => {

    if (res) {
      this.modal.zModalTSuccess({
        title: this.tService.t('mdl_success'),
        description: this.tService.t('mdl_delete_success_product'),
        btnCloseTitle: this.tService.t('btn_close')
      });

      this.refreshTable.next();
    }

  }, (err) => {

    this.modal.zModalTErrorLog({
      base: {
        title: this.tService.t('mdl_error'),
        description: this.tService.t('mdl_delete_fail_product'),
        btnCloseTitle: this.tService.t('btn_close')
      },
      btnLogTitle: this.tService.t('btn_details'),
      log: (err.error as IAPIResponse).message
    });

  });
}

public updateRow(value: any): void {
  this.updateCode = value.codigo
  this.formUpdate.setValueForm({ titulo: value.titulo, descricao: value.descricao, categoriaCodigo: value.categoriaCodigo });

  this.currentTab = ETabList.Update;
}

public insert(value: any): void {
  this.isLoadingAdd = true;

  this.api.addProduct({...value, categoriaCodigo: value.categoriaCodigo.codigo}).subscribe(() => {
    this.formAdd.resetForm();
    this.isLoadingAdd = false;

    this.modal.zModalTSuccess({
      title: this.tService.t('mdl_success'),
      description: this.tService.t('mdl_add_success_product'),
      btnCloseTitle: this.tService.t('btn_close')
    });

  }, (err) => {
    this.isLoadingAdd = false;

    this.modal.zModalTErrorLog({
      base: {
        title: this.tService.t('mdl_error'),
        description: this.tService.t('mdl_add_fail_product'),
        btnCloseTitle: this.tService.t('btn_close')
      },
      btnLogTitle: this.tService.t('btn_details'),
      log: (err.error as IAPIResponse).message
    });

  });

}

public update(value: any): void {
  this.isLoadingUpdate = true;

  this.api.updateProduct({...value, codigo: this.updateCode, categoriaCodigo: value.categoriaCodigo.codigo}).subscribe(() => {
    this.formUpdate.resetForm();
    this.isLoadingUpdate = false;

    this.modal.zModalTSuccess({
      title: this.tService.t('mdl_success'),
      description: this.tService.t('mdl_update_success_product'),
      btnCloseTitle: this.tService.t('btn_close')
    });

    this.currentTab = ETabList.List;
  }, (err) => {
    this.isLoadingUpdate = false;

    this.modal.zModalTErrorLog({
      base: {
        title: this.tService.t('mdl_error'),
        description: this.tService.t('mdl_update_fail_product'),
        btnCloseTitle: this.tService.t('btn_close')
      },
      btnLogTitle: this.tService.t('btn_details'),
      log: (err.error as IAPIResponse).message
    });

  });

}

}
