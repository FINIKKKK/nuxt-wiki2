<template>
  <div class="item">
    <!-- Иконка -->
    <svg-icon :name="props.type === 'article' ? 'document' : 'folder'" />
    <!-- Заголовок -->
    <div class="item__info">
      <div class="title">
        <NuxtLink :to="link">
          {{ props.data.name }}
        </NuxtLink>
        <div class="tags">
          <div class="tag" v-if="props.data.status_id === 1">Черновик</div>
        </div>
      </div>

      <!-- Дата -->
      <div
        class="date"
        v-html="useDateString(props.data.created_at, props.data.updated_at)"
      ></div>

      <!--------------------------------------
       Кнопки
      ---------------------------------------->
      <div class="btns" v-if="props.place">
        <!-- Кнопка удаления из избранного -->
        <button
          class="item__btn"
          v-if="props.place === 'favorite'"
          @click="removeFromFavorites"
        >
          Удалить из избранного
        </button>
      </div>
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useDateString } from '~/hooks/useDateString';
import { TArticle } from '~/utils/types/article';
import { TSection } from '~/utils/types/secton';
import { useCustomFetch } from '~/hooks/useCustomFetch';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  data: TSection | TArticle;
  type?: 'section' | 'article';
  place?: 'favorite' | 'moderation';
}>();

/**
 * События ----------------
 */
const emits = defineEmits(['removeFromFavorites']);

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут
const teamController = useTeamStore(); // Хранилище активной компании

/**
 * Вычислительные значения ----------------
 */
// Ссылка на элемент
const link = computed(() => {
  return `${
    teamController.activeTeam
      ? teamController.activeTeamSlug
      : `/companies/${props.data.team?.id}`
  }/${props.type === 'article' ? 'articles' : 'sections'}/${props.data.id}`;
});

/**
 * Методы ----------------
 */
// Удалить из избранного
const removeFromFavorites = async () => {
  if (window.confirm('Вы точно хотите удалить из избранного?')) {
    const data = await useCustomFetch(`account/bookmarks/remove`, {
      body: { article_id: props.data.id },
      method: 'POST',
    });

    if (data) {
      emits('removeFromFavorites', props.data.id);
    }
  }
};
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
    background-color: rgba($blue, 0.1);
    .btns {
      opacity: 1;
    }
  }
  .title {
    display: flex;
    align-items: center;
    font-size: 16px;
  }
  .tags {
    user-select: none;
    display: flex;
    align-items: center;
    margin-left: 15px;
  }
  .tag {
    &:not(:last-child) {
      margin-right: 5px;
    }
    background-color: rgba($gray, 0.3);
    color: $gray;
    font-size: 12px;
    line-height: 10px;
    padding: 5px 5px !important;
    border-radius: 2px;
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

.btns {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 12px;
  opacity: 0;
  transition: 0.3s;
  .item__btn {
    background-color: rgba($blue, 0.15);
    color: $blue;
    padding: 5px 10px;
    font-size: 13px;
    border-radius: 2px;
    transition: 0.2s;
    &:hover {
      background-color: rgba($blue, 0.2);
    }
  }
}
</style>
