<template>
  <NuxtLayout
    name="elem"
    type="article"
    :data="article.article"
    :properties="article.properties"
  >
    <!-- Вкладки -->
    <ElemPageTabs :tabs="articleEdit.article.tabs" />

    <!-- Дополнительный функционал -->
    <div class="footer">
      <!-- Кнопка изменения рейтинга -->
      <div class="rate">
        <p>{{ $t.rate }}</p>
        <div class="smiles">
          <i
            v-for="item in smiles"
            :key="item.id"
            :class="`fa-regular fa-${item.name} ${
              'active' && isRated === item.id
            }`"
            @click="() => onChangeRate(item.id)"
          />
        </div>
      </div>
      <!-- Список тэгов -->
      <ul class="tags"></ul>
    </div>

    <!-- Комментарии -->
    <Comments />

    <!-- Попап с комментированием блоков -->
    <PopupCommentsBlock
      :isOpen="elemController.isOpenComments"
      @close="elemController.closeComments"
    />
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useSectionsStore } from '~/stores/sectionsController';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TArticleData } from '~/utils/types/article';
import { TSectionData } from '~/utils/types/secton';
import { useCommentsStore } from '~/stores/CommentsController';
import { useElemStore } from '~/stores/ElemController';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  type?: 'public';
}>();

/**
 * Переменные ----------------
 */
const route = useRoute();
const teamController = useTeamStore();
const sectionsController = useSectionsStore();
const commentsController = useCommentsStore();
const elemController = useElemStore();
const isRated = ref<number | null>(null);
const smiles = [
  { id: 1, name: 'smile' },
  { id: 2, name: 'meh' },
  { id: 3, name: 'frown' },
];
const $t = await useTranslate('elem');

/**
 * Получение данных ----------------
 */
// Данные статьи
const { data: article } = await useCustomFetch<TArticleData>(`team/article`, {
  query: {
    team_id: teamController.activeTeamId,
    article_id: route.params.id,
  },
});
// Сохраняем комментарии в хранилище
commentsController.setComments(article.article.comments);
elemController.changeTypeElem('article');
elemController.setArticle(article);

// Данные статьи
const { data: articleEdit } = await useCustomFetch<TArticleData>(
  `team/article/edit`,
  {
    query: {
      team_id: teamController.activeTeamId,
      article_id: route.params.id,
    },
  },
);
elemController.changeAbilities([]);
elemController.setAbilities(articleEdit.abilities);
elemController.setCurrentAbility(null);

// Разделы
if (!elemController.section) {
  const { data: section } = await useCustomFetch<TSectionData>(`team/section`, {
    query: {
      team_id: teamController.activeTeamId,
      section_id: article.article.section.id,
    },
  });
  // Сохраняем в хранилище
  elemController.setSection(section.section);
  sectionsController.setBreadCrumbs(section.section.breadcrumbs);
}

/**
 * Методы ----------------
 */
// Изменить рейтинг
const onChangeRate = async (mark: number) => {
  const { message } = await useCustomFetch(`team/mark/add`, {
    body: {
      team_id: teamController.activeTeamId,
      entity_type: 'article',
      entity_id: route.params.id,
      mark,
    },
    method: 'POST',
  });
  if (message) {
    isRated.value = mark;
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
}

.rate {
  display: flex;
  align-items: center;
  i {
    font-size: 20px;
    width: 25px;
    height: 25px;
    fill: $gray;
    opacity: 0.2;
    cursor: pointer;
    font-weight: 700;
    &:hover {
      opacity: 1;
    }
    &.active {
      opacity: 1;
    }
  }
  p {
    margin-right: 10px;
  }
  .smiles {
    i:not(:last-child) {
      margin-right: 5px;
    }
  }
  .fa-smile {
    &:hover {
      color: green;
    }
    &.active {
      color: green;
    }
  }
  .fa-meh {
    &:hover {
      color: orange;
    }
    &.active {
      color: orange;
    }
  }
  .fa-frown {
    &:hover {
      color: red;
    }
    &.active {
      color: red;
    }
  }
}
</style>
