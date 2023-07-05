<template>
  <!-- Главный шаблон -->
  <NuxtLayout name="main" :nav="nav">
    <!--------------------------------------
      Элементы управления
    ---------------------------------------->
    <ArticlePageControls :type="props.type" />

    <!--------------------------------------
      Шапка элемента
    ---------------------------------------->
    <div class="elem__header">
      <svg-icon
        v-if="props.type === 'article'"
        :name="isFavorite ? 'favorite2' : 'favorite'"
        @click="toggleFavorite"
      />
      <!-- Заголовок -->
      <h1 class="title">{{ props.data.name }}</h1>
    </div>

    <!--------------------------------------
      Информация об элементе
    ---------------------------------------->
    <ul class="elem__info">
      <!-- Автор -->
      <li class="elem__info-item">
        Автор:
        <span>{{
          `${props.data?.creator.first_name} ${props.data?.creator.last_name}`
        }}</span>
      </li>
      <!-- Время -->
      <li
        class="elem__info-item"
        v-html="useDateString(props.data.created_at, props.data.updated_at)"
      ></li>
    </ul>

    <!--------------------------------------
      Слот
    ---------------------------------------->
    <slot />
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useDateString } from '~/hooks/useDateString';
import { TSection } from '~/utils/types/secton';
import { TArticle, TProperties } from '~/utils/types/article';
import { useTeamStore } from '~/stores/TeamContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TMessage } from '~/utils/types';
import { useSectionsStore } from '~/stores/SectionContoller';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  data: TSection | TArticle;
  properties?: TProperties;
  type: 'section' | 'article';
}>();

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут
const teamController = useTeamStore(); // Хранилище активной команды
const sectionsController = useSectionsStore(); // Хранилище

/**
 * Пользовательские переменные ----------------
 */
const isFavorite = ref(props.properties?.bookmark || false); // Находиться ли элемент в избранном?
// Навигация на странице
const nav = [
  {
    label: sectionsController.breadCrumbs[0]?.name,
    link: `${teamController.activeTeamSlug}/sections/${sectionsController.breadCrumbs[0]?.id}`,
  },
  {
    label: sectionsController.breadCrumbs[1]?.name || null,
    link: `${teamController.activeTeamSlug}/sections/${sectionsController.breadCrumbs[1]?.id}`,
  },
  {
    label:
      props.data.name !== sectionsController.breadCrumbs[1]?.name &&
      props.data.name !== sectionsController.breadCrumbs[0]?.name
        ? props.data.name
        : null,
    link: `${teamController.activeTeamSlug}/articles/${props.data.id}`,
  },
];

/**
 * Методы ----------------
 */
// Добавить или удалить из избранного
const toggleFavorite = async () => {
  const dto = { article_id: route.params.id };

  if (!isFavorite.value) {
    await useCustomFetch<TMessage>(`account/bookmarks/add`, {
      body: dto,
      method: 'POST',
    });
  } else {
    await useCustomFetch<TMessage>(`account/bookmarks/remove`, {
      body: dto,
      method: 'POST',
    });
  }
  isFavorite.value = !isFavorite.value;
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.elem__header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  position: relative;
  svg {
    width: 20px;
    height: 20px;
    position: absolute;
    left: -25px;
    cursor: pointer;
  }
}

.title {
  font-size: 24px;
  line-height: 28px;
}

.elem__info {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.elem__info-item {
  margin-right: 12px;
  color: $gray;
  span {
    color: $black;
  }
}
</style>
