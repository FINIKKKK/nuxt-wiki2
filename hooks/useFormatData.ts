/**
 * Хук для конвертирования даты
 */
export const useFormatDate = (dateString: string, lang: 'ru' | 'en') => {
  const months = {
    ru: [
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
    ],
    en: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  };

  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const day = date.getDate();
  const month = months[lang][date.getMonth()];
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  if (date.toDateString() === today.toDateString()) {
    return lang === 'ru' ? `Сегодня в ${hours}:${minutes}` : `Today at ${hours}:${minutes}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return lang === 'ru' ? `Вчера в ${hours}:${minutes}` : `Yesterday at ${hours}:${minutes}`;
  } else {
    return lang === 'ru' ? `${day} ${month} ${hours}:${minutes}` : `${month} ${day}, ${hours}:${minutes}`;
  }
};
