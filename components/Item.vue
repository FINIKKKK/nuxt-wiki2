<template>
  <div class="item">
    <!-- Иконка -->
    <svg-icon :name="props.type === 'article' ? 'document' : 'folder'" />
    <!-- Заголовок -->
    <div class="item__info">
      <NuxtLink :to="link">
        {{ props.data.name }}
      </NuxtLink>
      <!-- Дата -->
      <div
        class="date"
        v-html="useDateString(props.data.created_at, props.data.updated_at)"
      ></div>
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useUserStore } from '~/stores/UserController';
import { useTeamStore } from '~/stores/TeamContoller';
import { useDateString } from '~/hooks/useDateString';
import { TArticle } from '~/utils/types/article';
import { TSection } from '~/utils/types/secton';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  data: TSection | TArticle;
  type?: 'section' | 'article';
}>();

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут
const teamController = useTeamStore(); // Хранилище активной компании
const userController = useUserStore(); // Хранилище данных пользователя

/**
 * Вычислительные значения ----------------
 */
// Ссылка на элемент
const link = computed(() => {
  return `${teamController.activeTeamSlug}/${
    props.type === 'article' ? 'articles' : 'sections'
  }/${props.data.id}`;
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 9px 12px;
  transition: 0.3s;
  border-radius: 3px;
  &:hover {
    background-color: $blue2;
  }
  svg {
    width: 32px;
    height: 32px;
    margin-right: 15px;
  }
  a {
    margin-bottom: 0px;
    &:hover {
      text-decoration: none;
    }
  }
  .date {
    font-size: 12px;
    line-height: 14px;
    color: $gray;
    span {
      color: $black;
    }
  }
}
</style>
