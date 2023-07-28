import { useTeamStore } from '~/stores/TeamContoller';

/**
 * ------------------------------------------------------------
 * Middleware для проверки роли владельца
 * ------------------------------------------------------------
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  /**
   * Переменные ----------------
   */
  const teamController = useTeamStore();

  /**
   * Если пользователь не владелец, то перенаправляем на страницу ошибки ----------------
   */
  if (!teamController.isOwner) {
    throw createError({ statusCode: 403 });
  }
});
