/**
 * Хук для перевода страниц
 */
export const useTranslate = async (component: string) => {
  const lang = useCookie('lang');

  let t;
  try {
    t = await import(`~/utils/lang/${component}.ts`);
  } catch (error) {
    console.error(`Ошибка при импорте модуля ${component}:`, error);
  }

  return t.default?.[lang.value || 'ru'];
};
