/**
 * --------------------------------
 * Локальные данные
 * --------------------------------
 */
const $t = await useTranslate('data');

// Список доступов
export const accessArr = [
  { value: 1, label: "$t.access[0]" },
  { value: 2, label: "$t.access[1]" },
  { value: 3, label: "$t.access[2]" },
  { value: 4, label: "$t.access[3]" },
];

// Список ролей
export const roles = [
  { value: 'user', label: '$t.roles.user' },
  { value: 'admin', label: '$t.roles.admin' },
  { value: 'moderator', label: '$t.roles.moderator' },
];

// Список ролей
export const languages = [
  { value: 'ru', label: '$t.languages.ru' },
  { value: 'en', label: '$t.languages.en' },
];
