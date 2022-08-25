import { EAuthCrud } from './../enum/EAPI';
import { FormEmployeen } from './forms/FormEmployeen';
import { Component, EventEmitter, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { merge, of, Subject, Subscription } from 'rxjs';
import { ZModalService, ZTranslateService } from 'zmaterial';
import { EApiCrud, ETabList } from '../enum';
import { IAPIResponse } from '../interfaces';
import { AuthService } from '../services/auth.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { catchError, debounceTime, map, startWith, switchMap, tap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { FormUpdate } from './forms/FormUpdate';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // Global
  public currentTab = ETabList.Add

  // Form List
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  public filterStr = '';
  public refreshTable = new EventEmitter();
  public filterEvent: Subject<void> = new Subject();
  public dataSource: Subject<any[]> = new Subject();
  public displayedColumns = ['nome', 'email', 'login', 'previlegio', 'actions'];
  public resultLength = 0;
  public isLoadingList = true;
  private subscription = new Subscription();

  // Form Add
  public formAdd = new FormEmployeen(this.tService);
  public loadingUser = false;
  public loadingEmployeen = false;

  // Form Update
  public formUpdate = new FormUpdate(this.tService);
  public isLoadingUpdate = false;
  public updateCode = '';

  public constructor(
    private tService: ZTranslateService,
    private auth: AuthService,
    private modal: ZModalService,
    private ngZone: NgZone
  ) { }

  public ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public changeTab(event: MatTabChangeEvent): void {

    this.currentTab = event.index;

    if (event.index === ETabList.List) {
      this.refreshTable.next();
      this.formAdd.resetForm();
    }

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

        return this.auth.list({
          TamanhoPagina: this.paginator.pageSize,
          NumeroPagina: this.paginator.pageIndex + 1,
          CampoPesquisa: this.filterStr
        }, EAuthCrud.Funcionario).pipe(
          catchError((err) => {
            this.modal.zModalTErrorLog({
              base: {
                title: this.tService.t('mdl_error'),
                description: this.tService.t('mdl_list_fail_employeen'),
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
            description: this.tService.t('mdl_list_fail_employeen'),
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

  public updateRow(value: any): void {
    this.updateCode = value.codigo
    this.formUpdate.setValueForm({
      nome: value.nome,
      email: value.email,
      login: value.login,
      previlegio: {
        code: value.previlegio.codigo,
        desc: value.previlegio.descricao
      }
    });

    this.currentTab = ETabList.Update;
  }

  public sendEmployeen(value: any): void {
    this.loadingEmployeen = true;

    this.auth.registerEmployee({...value, previlegio: Number(value.previlegio.code)}).subscribe(() => {
      this.loadingEmployeen = false;

      this.formAdd.resetForm();

      this.modal.zModalTSuccess({
        title: this.tService.t('mdl_success'),
        description: this.tService.t('mdl_employeen_success'),
        btnCloseTitle: this.tService.t('btn_close')
      });

      this.currentTab = ETabList.List;
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

  public updateEmployeen(value: any): void {
    this.isLoadingUpdate = true;

    this.auth.update({...value, codigo: this.updateCode, previlegio: Number(value.previlegio.code)} ,EAuthCrud.Funcionario).subscribe(() => {
      this.isLoadingUpdate = false;

      this.modal.zModalTSuccess({
        title: this.tService.t('mdl_success'),
        description: this.tService.t('mdl_employeen_update_success'),
        btnCloseTitle: this.tService.t('btn_close')
      });

      this.currentTab = ETabList.List;
    }, (err) => {
      this.isLoadingUpdate = false;

      this.modal.zModalTErrorLog({
        base: {
          title: this.tService.t('mdl_error'),
          description: this.tService.t('mdl_employeen_update_fail'),
          btnCloseTitle: this.tService.t('btn_close')
        },
        btnLogTitle: this.tService.t('btn_details'),
        log: (err.error as IAPIResponse).message
      });
    });
  }
}
