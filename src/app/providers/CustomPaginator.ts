import { MatPaginatorIntl } from '@angular/material/paginator';
import { ZTranslateService } from 'zmaterial';

export function CustomPaginator(tService: ZTranslateService) {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = tService.t('ITEMS_PER_PAGE_LABEL');
  customPaginatorIntl.nextPageLabel = tService.t('NEXT_PAGE_LABEL');
  customPaginatorIntl.previousPageLabel = tService.t('PREVIOUS_PAGE_LABEL');
  customPaginatorIntl.firstPageLabel = tService.t('FIRST_PAGE_LABEL');
  customPaginatorIntl.lastPageLabel = tService.t('LAST_PAGE_LABEL');

  customPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return tService.t('RANGE_PAGE_LABEL_1', { length });
    }

    length = Math.max(length, 0);
    const startIndex = page * pageSize;

    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return tService.t('RANGE_PAGE_LABEL_2', { startIndex: startIndex + 1, endIndex, length });
  };

  return customPaginatorIntl;
}
