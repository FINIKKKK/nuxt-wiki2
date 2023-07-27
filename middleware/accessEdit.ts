import { useUserStore } from '~/stores/UserController';
import { useTeamStore } from '~/stores/TeamContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TUserData } from '~/utils/types/account';
import { TSectionData } from '~/utils/types/secton';
import { useSectionsStore } from '~/stores/sectionsController';
import { useElemStore } from '~/stores/ElemController';

/**
 * ------------------------------------------------------------
 * Глобальный middleware для проверки аутефикации пользователя
 * ------------------------------------------------------------
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  /**
   * Переменные ----------------
   */
  const teamController = useTeamStore();
  const sectionsController = useSectionsStore();
  const elemController = useElemStore();
  const route = useRoute();

  /**
   * Проверка аутефикации пользователя ----------------
   */


});
