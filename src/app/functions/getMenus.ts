import { Observable, of } from 'rxjs';
import { ZMenuItems, ZTranslateService } from 'zmaterial';
import { iAuth } from '../interfaces';

export function getMenus(privilege: 0 | 1 | 2, user: iAuth, tService: ZTranslateService): Observable<ZMenuItems[]> {

  if (user.email) {
    return of([
      {
        category: tService.t('cat_dashboard'),
        icon: 'grid_view',
        itens: [
          { label: tService.t('int_dashboard'), link: 'dashboard', icon: 'dashboard' },
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
        { label: tService.t('itn_produtct'), link: 'register/product', icon: 'inventory_2' },
        { label: tService.t('itn_methodPayment'), link: 'register/methodPayment', icon: 'credit_card' },
      ]
    },
    {
      category: tService.t('cat_dashboard'),
      icon: 'grid_view',
      itens: [
        { label: tService.t('int_dashboard'), link: 'dashboard', icon: 'dashboard' },
      ]
    }
  ];

  if (privilege === 0) {
    menu[0].itens.push({ label: tService.t('itn_users'), link: 'register/users', icon: 'person' });
  }

  return of(menu);

}
