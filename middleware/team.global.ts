import { Api } from '~/api';
import { useTeamStore } from '~/stores/TeamContoller';

/**
 * ------------------------------------------------------------
 * Глобальный middleware для проверки команды пользователя
 * ------------------------------------------------------------
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  /**
   * Переменные ----------------
   */
  const teamStore = useTeamStore(); // Хранилище активной команды

  /**
   * Проверка команды ----------------
   */
  // Если пользователь находиться на страницах команды
  if (to.fullPath.includes('/companies/')) {
    // Если нет активной команды
    if (!teamStore.activeTeam) {
      const id = to.fullPath.split('/')[2];
      // Получаем данные текущей команды
      const { data } = await Api().team.getOne(id);
      // Сохраняем в хранилище данные команды
      teamStore.setActiveTeam(data);
    }
  }
  // Если пользователь не находиться на страницах команды
  else {
    // Если установлена активная команда
    if (teamStore.activeTeam) {
      // Тогда ее обнуляем
      teamStore.setActiveTeam(null);
    }
  }
});
