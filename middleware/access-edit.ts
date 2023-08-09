import { useTeamStore } from '~/stores/TeamContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TSectionEdit } from '~/utils/types/secton';
import { TArticleEdit, TTabParse } from '~/utils/types/article';
import { useCreateElemStore } from '~/stores/CreateElemController';
import { useUserStore } from '~/stores/UserController';
import {useSectionsStore} from "~/stores/SectionsController";

/**
 * ------------------------------------------------------------
 * Middleware для проверки доступа редактирования
 * ------------------------------------------------------------
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  /**
   * Переменные ----------------
   */
  const teamController = useTeamStore();
  const userController = useUserStore();
  const createElemController = useCreateElemStore();
  const sectionsController = useSectionsStore();
  const type = to.fullPath.includes('sections') ? 's' : 'a';
  const typeAction = to.fullPath.includes('draft') ? 'd' : 'e';

  /**
   * Если это раздел ----------------
   */
  if (type === 's') {
    // Получаем данные раздела ----------------
    const { data: section, error } = await useCustomFetch<TSectionEdit>(
      `team/section/edit`,
      {
        query: {
          team_id: teamController.activeTeamId,
          section_id: to.params.id,
        },
      },
    );

    // При наличии ошибки, прокидываем ее ----------------
    if (error) {
      throw createError({ statusCode: error.statusCode });
    }

    // Сохраняем данные в хранилище ----------------
    const select = sectionsController.sections?.find(
      (obj) => obj.id === section.section.parent_id,
    );
    createElemController.setTitle(section.section.name);
    createElemController.setSelect(
      select ? { value: select.id, label: select.name } : null,
    );
    createElemController.setAbilities(section.abilities);
  } else {
    /**
     * Если это статья ----------------
     */
    // Получаем данные статьи ----------------
    const { data: article, error } = await useCustomFetch<TArticleEdit>(
      `team/article/edit`,
      {
        query: {
          team_id: teamController.activeTeamId,
          article_id: to.params.id,
        },
      },
    );

    // При наличии ошибки, прокидываем ее ----------------
    if (error) {
      throw createError({ statusCode: error.statusCode });
    }

    // Если не твой черновик, прокидываем ошибку
    if (
      typeAction === 'd' &&
      userController.user?.id !== article.article.created_by
    ) {
      throw createError({ statusCode: 403 });
    }

    // Сохраняем в хранилище ----------------
    createElemController.setArticle(article);
    // Значение селекта
    const section =
      sectionsController.sections?.find(
        (obj) => obj.id === article.article.section_id,
      ) || null;
    // Значение вкладок
    const tabs = computed(() => {
      return article.article.tabs.map((obj: TTabParse) => ({
        name: obj.name,
        content: JSON.parse(obj.content),
      }));
    });
    // Сохраняем данные в хранилище
    createElemController.setTitle(article.article.name); // Заголовок
    // Селект
    createElemController.setSelect(
      section
        ? {
            value: section.id,
            label: section.name,
          }
        : null,
    );
    // Вкладки
    createElemController.setTabs(tabs.value);
    // Тэги
    createElemController.setTags(article.article.tags);
    // Значение доступа
    createElemController.setAbilities(article.abilities);
  }
});
