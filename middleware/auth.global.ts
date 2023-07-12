import { useUserStore } from '~/stores/UserController';
import { useTeamStore } from '~/stores/TeamContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TUserData } from '~/utils/types/account';

/**
 * ------------------------------------------------------------
 * Глобальный middleware для проверки аутефикации пользователя
 * ------------------------------------------------------------
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  /**
   * Переменные ----------------
   */
  const userController = useUserStore(); // Хранилище данных пользователя
  const teamController = useTeamStore(); // Хранилище команд
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
    if (!userController.user) {
      try {
        // Получаем данные пользователя
        const { data } = await useCustomFetch<TUserData>(`/account`);

        if (data) {
          // Сохраняем в хранилище данные пользователя
          userController.setUser(data.user);
          // Сохраняем в хранилище команды пользователя
          teamController.setTeams(data.teams);
        }
      } catch (err) {
        // Если токен не валидный
        // Обнуляем токен
        token.value = '';
      }
    }
  }
});
