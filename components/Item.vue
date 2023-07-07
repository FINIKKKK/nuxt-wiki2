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
          <div class="tag" v-if="props.data.status_id === 2">На модерации</div>
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
        <!-- Кнопка редактирования -->
        <NuxtLink
          :to="`${teamController.activeTeamSlug}/articles/edit/${props.data.id}`"
          class="btn__item"
        >
          <svg-icon name="edit" />
          <p>Правка</p>
        </NuxtLink>
        <!-- Кнопка управления доступом -->
        <div class="btn__item">
          <svg-icon name="lock" />
          <p>Доступ</p>
        </div>
        <!-- Кнопка удаления из избранного -->
        <button
          class="btn__item2"
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
  place?: 'favorite' | 'moderation' | 'my';
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

.tags {
  user-select: none;
  display: flex;
  align-items: center;
  margin-left: 15px;
  .tag {
    &:not(:last-child) {
      margin-right: 5px;
    }
    background-color: rgba($blue, 0.15);
    color: $black;
    font-size: 12px;
    line-height: 10px;
    padding: 5px 5px !important;
    border-radius: 2px;
  }
}

.btns {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 12px;
  opacity: 0;
  transition: 0.3s;
  display: flex;
  align-items: center;
  .btn__item {
    &:not(:last-child) {
      margin-right: 20px;
    }
    cursor: pointer;
    display: flex;
    align-items: center;
    p {
      color: $black;
      font-size: 14px;
      transition: 0.3s;
    }
    svg {
      width: 17px;
      height: 17px;
      margin-right: 7px;
    }
    &:hover {
      p {
        color: $blue;
      }
    }
  }
  .btn__item2 {
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
