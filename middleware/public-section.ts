import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useElemStore } from '~/stores/ElemController';
import { TSection } from '~/utils/types/secton';
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
  try {
    // Данные раздела
    const { data: section, error } = await useCustomFetch<TSection>(`team/section`, {
      query: {
        team_id: to.params.company_id,
        section_id: to.params.id,
      },
    });
    // Сохраняем в хранилище
    elemController.setSection(section.section);
    sectionsController.setBreadCrumbs(section.section.breadcrumbs);
    elemController.changeTypeElem('section');

    // Прокидываем ошибку, если нет публичного доступа
    if (section.section.public === 0) {
      throw createError({ statusCode: 404 });
    }
  } catch (err) {
    // Прокидываем ошибку, если нет доступа
    // throw createError({ statusCode: 403 });
  }
});
