import { useTeamStore } from '~/stores/TeamContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import {TActiveTeam} from "~/utils/types/team";

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

      if (data) {
        // Сохраняем в хранилище данные команды
        teamController.setActiveTeam(data);
      }
    }
  }
  // Если пользователь не находиться на страницах команды
  else {
    // Если установлена активная команда
    if (teamController.activeTeam) {
      // Тогда ее обнуляем
      teamController.setActiveTeam(null);
    }
  }
});
