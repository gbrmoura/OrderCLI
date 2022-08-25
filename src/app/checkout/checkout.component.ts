import { EApiCrud } from './../enum/EAPI';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingService } from '../services/shopping.service';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ZTranslateService, ZModalService, ZFormProvider, ZFormInputBase, ZFormInputSelect, ZSearchResult, ZFormInputTextArea } from 'zmaterial';
import { ApiService } from "../services/api.service";
import { IAPIResponse } from '../interfaces';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shopping',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent extends ZFormProvider implements OnInit {

  public isLoading = false;

  public items: any[] = [];
  public total: any;
  public quantidade: any;

  public constructor(
    private tService: ZTranslateService,
    public api: ApiService,
    private router: Router,
    private shop: ShoppingService,
    private auth: AuthService,
    private modal: ZModalService
  ) { super(); }

  ngOnInit(): void {
    this.isLoading = true;

    if (this.shop.isShoppingValid()) {{
      this.items = this.shop.getShopping(this.auth.session?.codigo);
      this.total = this.items.reduce((acc, item) => acc + item.valor * item.quantidade, 0).toFixed(2);
      this.quantidade = this.items.reduce((acc, item) => acc + item.quantidade, 0);
    }}

    this.isLoading = false;
  }

  public getInputs(): Observable<ZFormInputBase<any>[]> {
    return of([
      new ZFormInputSelect<string, any>({
        label: this.tService.t('frm_label_checkout_payment_method'),
        key: 'metodoPagamentoCodigo',
        icon: 'credit_card',
        required: true,
        searchItens: (value: string, numberOfItens: number): Observable<ZSearchResult<any>> => {

          const search = (value || '');

          return this.api.list({ TamanhoPagina: 15, NumeroPagina: 1, CampoPesquisa: search }, EApiCrud.MetodoPagamento).pipe(
            map((result) => {

              if (!result.response) {
                return {
                  items: [],
                  totalItems: 0
                };
              }

              return {
                items: result.response.dados,
                totalItems: result.response.numeroRegistros
              }

            })
          );

        },
        firstDisplaySelect: (element: any) => element.titulo + '',
      }),
      new ZFormInputTextArea({
        label: this.tService.t('frm_input_inventory_observation'),
        key: 'observacao',
        layout: {
          cols: 100
        },
        icon: 'notes',
      })
    ]);
  }

  public finalize(event: any): void {
    this.isLoading = true;

    // montar objeto
    var payload: any = {
      metodoPagamentoCodigo: event.metodoPagamentoCodigo.codigo,
      observacao: event.observacao,
      items: this.items.map(item => {
        return {
          produtoCodigo: item.codigo,
          quantidade: item.quantidade
        }
      })
    }

    this.api.insert(payload, EApiCrud.Pedido).subscribe(
      (response: any) => {
        this.isLoading = false;
        this.modal.zModalTSuccess({
          title: this.tService.t('mdl_success_title'),
          description: this.tService.t('mdl_success_description'),
          btnCloseTitle: this.tService.t('btn_close'),
        });
        this.shop.clearShopping(this.auth.session?.codigo);
        this.router.navigateByUrl('/menu');

      },
      (err: any) => {
        this.isLoading = false;
        this.shop.clearShopping(this.auth.session?.codigo);
        this.modal.zModalTErrorLog({
          base: {
            title: this.tService.t('mdl_error'),
            description: this.tService.t('mdl_order_error'),
            btnCloseTitle: this.tService.t('btn_close')
          },
          btnLogTitle: this.tService.t('btn_details'),
          log: (err.error as IAPIResponse).message,
        });
        this.router.navigateByUrl('/menu');
      }
    );

  }

  public cancel(): void {
    this.router.navigateByUrl('/menu');
  }

}
