import { useTeamStore } from '~/stores/TeamContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TActiveTeam } from '~/utils/types/team';
import { useUserStore } from '~/stores/UserController';

/**
 * ------------------------------------------------------------
 * Глобальный middleware для проверки команды пользователя
 * ------------------------------------------------------------
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  /**
   * Переменные ----------------
   */
  const teamController = useTeamStore();
  const userController = useUserStore();

  /**
   * Проверка команды ----------------
   */
  // Если пользователь находиться на страницах команды
  if (to.fullPath.includes('/companies/')) {
    // Если нет активной команды
    if (!teamController.activeTeam) {
      const id = to.fullPath.split('/')[2];
      // Получаем данные текущей команды
      const { data } = await useCustomFetch<TActiveTeam>(`/team`, {
        query: { team_id: id },
      });

      // Прокидываем ошибку, если нет данного польователя в команде
      if (data.team && !data.role) {
        throw createError({ statusCode: 403 });
      }

      if (data) {
        // Сохраняем в хранилище данные команды
        teamController.setActiveTeam(data);
      }
    }

    // Получение данных биллинга пользователя
    if (teamController.isOwner && !userController.billing) {
      const { data: billing } = await useCustomFetch(`billing`, {
        query: {
          team_id: teamController.activeTeamId,
        },
      });
      userController.setBillingData(billing);
    }
  }
  // Если пользователь не находиться на страницах команды
  else {
    // Если установлена активная команда
    if (teamController.activeTeam) {
      // Тогда ее обнуляем данные
      teamController.setActiveTeam(null);
      userController.setBillingData(null);
    }
  }
});
