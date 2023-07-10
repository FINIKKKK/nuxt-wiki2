/**
 * Хук для конвертирования даты
 */
export const useFormatDate = (dateString: string) => {
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const day = date.getDate();
  const month = months[date.getMonth()];
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  if (date.toDateString() === today.toDateString()) {
    return `Сегодня в ${hours}:${minutes}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return `Вчера в ${hours}:${minutes}`;
  } else {
    return `${day} ${month} ${hours}:${minutes}`;
  }
};
