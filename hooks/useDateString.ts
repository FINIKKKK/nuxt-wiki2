import { useFormatDate } from '~/hooks/useFormatData';


// const $t = await useTranslate('elem');

/**
 * Хук для правильного отображения даты
 */
export const useDateString = (createdAt: string, updatedAt: string) => {
  // Либо дата создания
  if (createdAt !== updatedAt) {
    return `${''}: <span style="color: #000000">${useFormatDate(
      updatedAt,
    )}<span>`;
  }
  // Либо дата изменения
  else {
    return `${''}: <span style="color: #000000">${useFormatDate(
      createdAt,
    )}<span>`;
  }
};
