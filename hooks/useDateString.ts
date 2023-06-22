import { useFormatDate } from '~/hooks/useFormatData';

/**
 * Хук для правильного отображения даты
 */
export const useDateString = (createdAt: string, updatedAt: string) => {
  // Либо дата создания
  if (createdAt !== updatedAt) {
    return `Обновлено: <span style="color: #000000">${useFormatDate(
      updatedAt,
    )}<span>`;
  }
  // Либо дата изменения
  else {
    return `Опубликовано: <span style="color: #000000">${useFormatDate(
      createdAt,
    )}<span>`;
  }
};
