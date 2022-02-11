import { Observable, of } from 'rxjs';
import { ZMenuItems, ZTranslateService } from 'zmaterial';
import { iAuth } from '../interfaces';

export function getMenus(privilege: 0 | 1 | 2 | 3, user: iAuth, tService: ZTranslateService): Observable<ZMenuItems[]> {

  if (user.previlegio === 3) {
    return of([
      {
        category: tService.t('cat_menu'),
        icon: 'grid_view',
        itens: [
          { label: tService.t('int_menu'), link: 'menu', icon: 'restaurant_menu' },
          { label: tService.t('int_shopping'), link: 'shopping', icon: 'shopping_cart'},
          { label: tService.t('int_checkout'), link: 'shopping/checkout', icon: 'payment' },
          { label: tService.t('int_order'), link: 'order/user', icon: 'receipt' },
        ]
      },
      {
        category: tService.t('cat_order'),
        icon: 'list_alt',
        itens: [
          { label: tService.t('int_orders'), link: '', icon: 'reorder' },
        ]
      }
    ]);
  }

  const menu = [
    {
      category: tService.t('cat_register'),
      icon: 'add',
      itens: [
        { label: tService.t('itn_category'), link: 'register/category', icon: 'category' },
        { label: tService.t('itn_produtct'), link: 'register/product', icon: 'sell' },
        { label: tService.t('itn_inventory'), link: 'register/inventory', icon: 'inventory' },
        { label: tService.t('itn_methodPayment'), link: 'register/methodPayment', icon: 'credit_card' },
      ]
    },
    {
      category: tService.t('cat_dashboard'),
      icon: 'grid_view',
      itens: [
        { label: tService.t('int_dashboard'), link: 'dashboard', icon: 'dashboard' },
        { label: tService.t('int_order'), link: 'order/worker', icon: 'receipt' },
      ]
    }
  ];

  if (privilege === 0) {
    menu[0].itens.push({ label: tService.t('itn_users'), link: 'register/users', icon: 'person' });
  }

  return of(menu);

}
