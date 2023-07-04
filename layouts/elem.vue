<template>
  <!-- Главный шаблон -->
  <NuxtLayout name="main" :nav="nav">
    <!--------------------------------------
      Элементы управления
    ---------------------------------------->
    <Controls :type="props.type" />

    <!--------------------------------------
      Шапка элемента
    ---------------------------------------->
    <div class="elem__header">
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
import { TArticle } from '~/utils/types/article';
import { useTeamStore } from '~/stores/TeamContoller';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  data: TSection | TArticle;
  type: 'section' | 'article';
}>();

/**
 * Системные переменные ----------------
 */
const teamController = useTeamStore(); // Хранилище активной команды

/**
 * Пользовательские переменные ----------------
 */
// Навигация на странице
const nav = [
  {
    label: props.data.parent?.name || props.data.section?.name,
    link: `${teamController.activeTeamSlug}/${
      props.type === 'section' ? 'sections' : 'articles'
    }/${props.data.parent ? props.data.parent?.id : props.data.section?.id}`,
  },
  {
    label: props.data.name,
    link: `${teamController.activeTeamSlug}/${
      props.type === 'section' ? 'sections' : 'articles'
    }/${props.data.id}`,
  },
];
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.elem__header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  position: relative;
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
