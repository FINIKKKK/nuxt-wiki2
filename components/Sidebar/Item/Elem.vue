<template>
  <li class="sidebar__item">
    <NuxtLink :to="itemLink">
      <i
        :class="`fa-regular fa-${
          props.type === 'section' ? 'folder' : 'file-alt'
        }`"
      ></i>
      <p>{{ props.data.name }}</p>
    </NuxtLink>
  </li>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { TSection } from '~/utils/types/secton';
import { TArticle } from '~/utils/types/article';

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
 * Вычисляемые значения ----------------
 */
// Ссылка на элемент
const itemLink = computed(() => {
  return `${teamController.activeTeamSlug}/${
    props.type === 'section' ? 'sections' : 'articles'
  }/${props.data.id}`;
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
