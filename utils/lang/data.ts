import { languages } from '~/utils/data';

export default {
  ru: {
    roles: {
      user: 'Пользователь',
      admin: 'Администратор',
      moderator: 'Модератор',
    },
    languages: {
      ru: 'Русский',
      en: 'Английский',
    },
    access: [
      'Полный доступ',
      'Чтение и редактирование',
      'Только чтение',
      'Без доступа',
    ],
  },
  en: {
    roles: {
      user: 'User',
      admin: 'Admin',
      moderator: 'Moderator',
    },
    languages: {
      ru: 'Russian',
      en: 'English',
    },
    access: [
      'Full access ',
      'Reading and editing',
      'Read only',
      'Without access',
    ],
  },
};
