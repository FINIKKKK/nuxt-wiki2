<template>
  <li class="sidebar__item">
    <NuxtLink :to="itemLink">
      <i
        :class="`fa-regular fa-${
          props.type === 'section' ? 'folder' : 'file-alt'
        }`"
      ></i>
      <p>{{ props.data.name }}</p>
      <div class="flags">
        <div class="flag" v-if="props.data.status_id === 1">
          {{ $t.item.draft }}
        </div>
        <div class="flag" v-if="props.data.status_id === 2">
          {{ $t.item.moderation }}
        </div>
      </div>
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
 * Переменные ----------------
 */
const teamController = useTeamStore();
const $t = await useTranslate('elem');

/**
 * Вычисляемое ----------------
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
