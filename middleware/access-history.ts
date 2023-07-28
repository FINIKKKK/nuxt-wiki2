import { useTeamStore } from '~/stores/TeamContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TArticleData } from '~/utils/types/article';
import { useUserStore } from '~/stores/UserController';
import { useCreateElemStore } from '~/stores/CreateElemController';

/**
 * ------------------------------------------------------------
 * Middleware для доступа к журанала версии
 * ------------------------------------------------------------
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  /**
   * Переменные ----------------
   */
  const teamController = useTeamStore();
  const userController = useUserStore();
  const createController = useCreateElemStore();

  /**
   * Если пользователь не владелец, то перенаправляем на страницу ошибки ----------------
   */
  // Данные статьи
  const { data: article } = await useCustomFetch<TArticleData>(
    `team/article/edit`,
    {
      query: {
        team_id: teamController.activeTeamId,
        article_id: to.params.id,
      },
    },
  );

  // Прокидываем ошибку, если нет доступа
  if (
    !teamController.isAccessEdit &&
    userController.user?.id !== article.article.created_by
  ) {
    throw createError({ statusCode: 403 });
  }

  // Сохраняем в хранилище
  createController.setArticle(article);
});
