import { useTeamStore } from '~/stores/TeamContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TArticleData } from '~/utils/types/article';
import { useElemStore } from '~/stores/ElemController';
import { TSectionData } from '~/utils/types/secton';
import { useSectionsStore } from '~/stores/SectionsController';
import { useCommentsStore } from '~/stores/CommentsController';
import { useRequestStore } from '~/stores/RequestController';

/**
 * ------------------------------------------------------------
 * Middleware для доступа к публичному доступу статьи
 * ------------------------------------------------------------
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  /**
   * Переменные ----------------
   */
  const elemController = useElemStore();
  const teamController = useTeamStore();
  const commentsController = useCommentsStore();

  /**
   * Получение данных ----------------
   */
  try {
    /**
     * Получение данных ----------------
     */
    // Данные статьи
    const { data: article, error } = await useCustomFetch<TArticleData>(
      `team/article`,
      {
        query: {
          team_id: teamController.activeTeamId,
          article_id: to.params.id,
        },
      },
    );
    // Сохраняем в хранилище
    commentsController.setComments(article.article.comments);
    elemController.changeTypeElem('article');
    elemController.setArticle(article);

    console.log('error');
    console.log(error);

    // Данные статьи
    const { data: articleEdit } = await useCustomFetch<TArticleData>(
      `team/article/edit`,
      {
        query: {
          team_id: teamController.activeTeamId,
          article_id: to.params.id,
        },
      },
    );
    // Сохраняем в хранилище
    elemController.setTabs(articleEdit.article.tabs);
    elemController.changeAbilities([]);
    elemController.setAbilities(articleEdit.abilities);
    elemController.setCurrentAbility(null);

    if (article.article.public === 0) {
      throw createError({ statusCode: 404 });
    }
  } catch (err) {
    throw createError({ statusCode: 404 });
  }
});
