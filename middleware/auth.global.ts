import { Api } from '~/api';
import { useUserStore } from '~/stores/UserController';

/**
 * ------------------------------------------------------------
 * Глобальный middleware для проверки аутефикации пользователя
 * ------------------------------------------------------------
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  /**
   * Переменные ----------------
   */
  const userStore = useUserStore(); // Хранилище пользователя
  const excludedRoutes = ['/register', '/login']; // Исключенные маршруты
  const token = useCookie('token'); // Токен

  /**
   * Проверка аутефикации пользователя ----------------
   */
  // Если нет токена
  if (!token.value && !excludedRoutes.includes(to.fullPath)) {
    // Перенаправляем пользователя на страницу авторизации
    return navigateTo('/login');
  }
  // Если есть токен
  else if (token.value) {
    // Если в хранилище нету данных пользователя
    if (!userStore.user) {
      try {
        // Получаем данные пользователя
        const { data } = await Api().account.me();
        // Сохраняем в хранилище данные пользователя
        userStore.setUser(data.user);
        // Сохраняем в хранилище команды пользователя
        userStore.setTeams(data.teams);
      } catch (err) {
        // Если токен не валидный
        // Обнуляем токен
        token.value = '';
      }
    }
  }
});
