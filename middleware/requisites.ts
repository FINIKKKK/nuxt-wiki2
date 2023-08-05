import { useTeamStore } from '~/stores/TeamContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useRequisitesStore } from '~/stores/RequisitesController';

/**
 * ------------------------------------------------------------
 * Middleware для проверки наличия реквизитов
 * ------------------------------------------------------------
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  /**
   * Переменные ----------------
   */
  const teamController = useTeamStore();
  const requisitesController = useRequisitesStore();

  /**
   * Получение данных ----------------
   */
  // Данные реквизитров
  if (!requisitesController.requisites) {
    const { data: requisites } = await useCustomFetch(`billing/requisites`, {
      query: { team_id: teamController.activeTeamId },
    });
    requisitesController.setRequisites(requisites);
  }

  /**
   * Если нет реквиитов, то перенапрвляем на страницу добавления реквизитов ----------------
   */
  if (!requisitesController.requisites) {
    return navigateTo(`${teamController.activeTeamSlug}/billing/requisites/add`);
  }
});
