import { AfterViewInit, Component, EventEmitter, OnInit, ViewChild, OnDestroy, NgZone } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { merge, of, Subject, Subscription } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap, tap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { ZModalService, ZTranslateService } from 'zmaterial';
import { IAPIResponse } from '../interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit, OnDestroy{

  public items: any[] = [];
  public countAddItem = 0;
  public sumItems = 0;

  // Card List
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  public filterEvent: Subject<void> = new Subject();
  public filterStr = '';
  public refreshTable = new EventEmitter();

  private subscription = new Subscription();

  constructor(
    private api: ApiService,
    private modal: ZModalService,
    private tService: ZTranslateService,
    private ngZone: NgZone) { }


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
        return this.api.menu({ TamanhoPagina: 30, NumeroPagina: 1, CampoPesquisa: this.filterStr }).pipe(
          catchError((err) => {
            this.modal.zModalTErrorLog({
              base: {
                title: this.tService.t('mdl_error'),
                description: this.tService.t('mdl_list_fail_menu'),
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
            description: this.tService.t('mdl_list_fail_menu'),
            btnCloseTitle: this.tService.t('btn_close')
          },
          btnLogTitle: this.tService.t('btn_details'),
          log: (err.error as IAPIResponse).message
        });

        return of([]);
      })
    ).subscribe((data) => {

      this.ngZone.run(() => {
        this.items = data;
      });

    });
  }

  public addCart(item: any): void {
    this.countAddItem++;
    this.sumItems += item.valor;
    console.log('Adicionar: ', item);
  }

}
