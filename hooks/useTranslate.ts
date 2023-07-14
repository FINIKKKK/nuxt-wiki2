/**
 * Хук для перевода страниц
 */
export const useTranslate = async (
  component: string,
  unComposable?: boolean,
) => {
  let lang = 'ru';
  if (unComposable) {
    const langCookie = process.client
      ? document.cookie
          .split(';')
          .find((cookie) => cookie.trim().startsWith('lang='))
      : null;

    lang = langCookie?.split('=')[1] || 'ru';
  } else {
    const langCookie = useCookie('lang');
    lang = langCookie.value || 'ru';
  }

  let t;
  try {
    t = await import(`~/utils/lang/${component}.ts`);
  } catch (error) {
    console.error(`Ошибка при импорте модуля ${component}:`, error);
  }

  return t?.default?.[lang];
};
