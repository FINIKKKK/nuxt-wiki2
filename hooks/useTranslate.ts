import { useUserStore } from '~/stores/UserController';

export const useTranslate = async (component: string) => {
  const userController = useUserStore();

  const lang = userController.user?.locale || 'ru';

  let t;
  try {
    t = await import(`~/utils/lang/${component}.ts`);
  } catch (error) {
    // Обработка ошибки, если модуль не найден
    console.error(`Ошибка при импорте модуля ${component}:`, error);
  }

  return t?.default?.[lang];
};
