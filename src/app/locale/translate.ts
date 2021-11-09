import { ZLanguageData } from 'zmaterial';
import { TCategory } from './TCategory';
import { TFirstRegister } from './TFirstRegister';
import { TGeneric } from './TGeneric';
import { TInventory } from './TInventory';
import { TLogin } from './TLogin';
import { TMenu } from './TMenu';
import { TMenuFood } from './TMenuFood';
import { TMethodPayment } from './TMethodPayment';
import { TPaginator } from './TPaginator';
import { TProduct } from './TProduct';
import { TUsers } from './TUsers';

export const Translate: ZLanguageData = {
  pt: {
    ...TGeneric.pt,
    ...TMenu.pt,
    ...TLogin.pt,
    ...TFirstRegister.pt,
    ...TUsers.pt,
    ...TCategory.pt,
    ...TPaginator.pt,
    ...TProduct.pt,
    ...TMethodPayment.pt,
    ...TInventory.pt,
    ...TMenuFood.pt
  },
  en: {
    ...TGeneric.en,
    ...TMenu.en,
    ...TLogin.en,
    ...TFirstRegister.en,
    ...TUsers.en,
    ...TCategory.en,
    ...TPaginator.en,
    ...TProduct.en,
    ...TMethodPayment.en,
    ...TInventory.en,
    ...TMenuFood.en
  }
};
