import { useTeamStore } from '~/stores/TeamContoller';

/**
 * ------------------------------------------------------------
 * Middleware для проверки доступа к модерации
 * ------------------------------------------------------------
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  /**
   * Переменные ----------------
   */
  const teamController = useTeamStore();

  /**
   * Если пользователь не имеет прав модерации, то прокидываем ошибку ----------------
   */
  if (!teamController.isAccessEdit) {
    throw createError({ statusCode: 403 });
  }
});
