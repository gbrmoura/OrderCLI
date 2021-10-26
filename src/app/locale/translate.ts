import { ZLanguageData } from 'zmaterial';
import { TFirstRegister } from './TFirstRegister';
import { TGeneric } from './TGeneric';
import { TLogin } from './TLogin';
import { TMenu } from './TMenu';
import { TUsers } from './TUsers';

export const Translate: ZLanguageData = {
  pt: {
    ...TGeneric.pt,
    ...TMenu.pt,
    ...TLogin.pt,
    ...TFirstRegister.pt,
    ...TUsers.pt
  },
  en: {
    ...TGeneric.en,
    ...TMenu.en,
    ...TLogin.en,
    ...TFirstRegister.en,
    ...TUsers.en
  }
};
