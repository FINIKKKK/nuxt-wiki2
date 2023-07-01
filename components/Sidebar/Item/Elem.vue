<template>
  <li class="sidebar__item" :class="{ post: props.type === 'elem' }">
    <NuxtLink :to="itemLink">
      <svg-icon :name="props.type === 'section' ? 'folder' : 'document'" />
      <p>{{ props.data.name }}</p>
    </NuxtLink>
  </li>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { TItem } from '~/utils/types/sidebar';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  data: TItem;
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
  return `${teamController.activeTeamId}/${
    props.type === 'section' ? 'sections' : 'articles'
  }/${props.data.id}`;
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
