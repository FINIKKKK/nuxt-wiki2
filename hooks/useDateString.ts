import { useFormatDate } from '~/hooks/useFormatData';

/**
 * Хук для правильного отображения даты
 */
export const useDateString = (
  createdAt: string,
  updatedAt: string,
  lang: 'ru' | 'en',
) => {
  // Либо дата создания
  if (createdAt !== updatedAt) {
    return `${
      lang === 'ru' ? 'Обновлено' : 'Updated'
    }: <span style="color: #000000">${useFormatDate(updatedAt, lang)}<span>`;
  }
  // Либо дата изменения
  else {
    return `${
      lang === 'ru' ? 'Опубликовано' : 'Published'
    }: <span style="color: #000000">${useFormatDate(createdAt, lang)}<span>`;
  }
};
