<template>
  <NuxtLayout
    name="elem"
    type="article"
    :data="data.article"
    :properties="data.properties"
  >
    <!-- Вкладки -->
    <ElemPageTabs :tabs="data.article.tabs" />

    <!-- Дополнительный функционал -->
    <div class="footer">
      <!-- Кнопка изменения рейтинга -->
      <div class="rate">
        <p>Эта страница была полезной?</p>
        <div class="smiles">
          <svg-icon name="smile" @click="onChangeRate" class="green" />
          <svg-icon name="smile2" @click="onChangeRate" class="orange" />
          <svg-icon name="smile3" @click="onChangeRate" class="red" />
        </div>
      </div>
      <!-- Список тэгов -->
      <ul class="tags"></ul>
    </div>

    <!-- Комментарии -->
    <Comments :comments="data.article.comments" />
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useSectionsStore } from '~/stores/SectionContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TArticleData } from '~/utils/types/article';
import { TSectionData } from '~/utils/types/secton';
import { useCommentsStore } from '~/stores/CommentsController';
import { useElemStore } from '~/stores/ElemController';

/**
 * Переменные ----------------
 */
const route = useRoute();
const teamController = useTeamStore();
const sectionsController = useSectionsStore();
const commentsController = useCommentsStore();
const elemController = useElemStore();

/**
 * Получение данных ----------------
 */
// Данные статьи
const { data } = await useCustomFetch<TArticleData>(`team/article`, {
  query: {
    team_id: teamController.activeTeamId,
    article_id: route.params.id,
  },
});
console.log(data.value);
// Сохраняем комментарии в хранилище
commentsController.setComments(data.value.article.comments);
elemController.changeTypeElem('article');
elemController.setArticle(data.value);

// Получаем разделы
if (!sectionsController.section) {
  const { data: section } = await useCustomFetch<TSectionData>(`team/section`, {
    query: {
      team_id: teamController.activeTeamId,
      section_id: data.value.article.section.id,
    },
  });
  // Сохраняем в хранилище
  sectionsController.setSection(section.value.section);
  sectionsController.setBreadCrumbs(section.value.section.breadcrumbs);
}

/**
 * Методы ----------------
 */
// Изменить рейтинг
const onChangeRate = async () => {
  const { data } = await useCustomFetch(`team/mark/add`, {
    body: {
      team_id: teamController.activeTeamId,
      entity_type: 'article',
      entity_id: route.params.id,
      mark: 3,
    },
    method: 'POST',
  });
  console.log('gg', data.value);
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
}

.rate {
  display: flex;
  align-items: center;
  svg {
    width: 25px;
    height: 25px;
    fill: $gray;
    opacity: 0.3;
    cursor: pointer;
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
    svg:not(:last-child) {
      margin-right: 5px;
    }
  }
  .green {
    &:hover {
      fill: green;
    }
    &.active {
      fill: green;
    }
  }
  .orange {
    &:hover {
      fill: orange;
    }
    &.active {
      fill: orange;
    }
  }
  .red {
    &:hover {
      fill: red;
    }
    &.active {
      fill: red;
    }
  }
}
</style>
