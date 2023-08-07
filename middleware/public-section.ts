import { useTeamStore } from '~/stores/TeamContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TArticleData } from '~/utils/types/article';
import { useUserStore } from '~/stores/UserController';
import { useElemStore } from '~/stores/ElemController';
import { TSectionData } from '~/utils/types/secton';
import { useSectionsStore } from '~/stores/SectionsController';

/**
 * ------------------------------------------------------------
 * Middleware для доступа к публичному доступу раздела
 * ------------------------------------------------------------
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  /**
   * Переменные ----------------
   */
  const elemController = useElemStore();
  const sectionsController = useSectionsStore();

  /**
   * Получение данных ----------------
   */
  // Данные раздела
  const { data: section } = await useCustomFetch<TSectionData>(`team/section`, {
    query: {
      team_id: to.params.company_id,
      section_id: to.params.id,
    },
  });
  // Сохраняем в хранилище
  elemController.setSection(section.section);
  sectionsController.setBreadCrumbs(section.section.breadcrumbs);
  elemController.changeTypeElem('section');

  // Прокидываем ошибку, если нет доступа
  // if (
  //   section.public
  // ) {
  //   throw createError({ statusCode: 403 });
  // }
});
