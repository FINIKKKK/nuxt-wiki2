import { useFormatDate } from '~/hooks/useFormatData';
import { useTranslate } from '~/hooks/useTranslate';

const $t = await useTranslate('elem', true);

/**
 * Хук для правильного отображения даты
 */
export const useDateString = (createdAt: string, updatedAt: string) => {
  // Либо дата создания
  if (createdAt !== updatedAt) {
    return `${$t.update}: <span style="color: #000000">${useFormatDate(
      updatedAt,
    )}<span>`;
  }
  // Либо дата изменения
  else {
    return `${$t.create}: <span style="color: #000000">${useFormatDate(
      createdAt,
    )}<span>`;
  }
};
