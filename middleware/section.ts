import { useSectionsStore } from '~/stores/SectionContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TSectionData } from '~/utils/types/secton';
import { useTeamStore } from '~/stores/TeamContoller';

/**
 * ------------------------------------------------------------
 * Middleware для проверки аутефикации пользователя
 * ------------------------------------------------------------
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  /**
   * Переменные ----------------
   */
  const route = useRoute(); // Роут
  const teamController = useTeamStore(); // Хранилище активной команды
  const sectionsController = useSectionsStore(); // Хранилище разделов

  /**
   * Проверка аутефикации пользователя ----------------
   */
  // Если нет токена
  if (!sectionsController.section) {
    // Получаем данные раздела
    // const { data } = await useCustomFetch<TSectionData>(`team/section`, {
    //   query: {
    //     team_id: teamController.activeTeamId,
    //     section_id: to.params.id,
    //   },
    // });
  //   // Сохраняем в хранилище
  //   sectionsController.setSection(data.value.section);
  //   sectionsController.setParentId(data.value.section.parent_id);
  //   if (!data.value.section.parent_id) {
  //     sectionsController.setIsChild(false);
  //   } else {
  //     sectionsController.setIsChild(true);
  //   }
  }
});
