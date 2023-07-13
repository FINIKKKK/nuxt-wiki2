/**
 * Хук для перевода страниц
 */
export const useTranslate = async (component: string) => {
  const langCookie = useCookie('lang'); // Значение языка в куках
  const lang = langCookie.value || 'ru'; // Значение языка

  // Испортируем нужный компонент
  let t;
  try {
    t = await import(`~/utils/lang/${component}.ts`);
  } catch (error) {
    // Обработка ошибки, если модуль не найден
    console.error(`Ошибка при импорте модуля ${component}:`, error);
  }

  // Возвращаем нужный объект
  return t?.default?.[lang];
};
