<template>
  <div class="item">
    <!-- Иконка -->
    <i
      :class="`fa-regular fa-${
        props.type === 'article' ? 'file-alt' : 'folder'
      }`"
    ></i>
    <!-- Заголовок -->
    <div class="item__info">
      <div class="title">
        <NuxtLink :to="link">
          {{ props.data.name }}
        </NuxtLink>
        <div class="flags">
          <div class="flag" v-if="props.data.status_id === 1">
            {{ $t.item.draft }}
          </div>
          <div class="flag" v-if="props.data.status_id === 2">
            {{ $t.item.moderation }}
          </div>
        </div>
      </div>

      <!-- Дата -->
      <div
        class="date"
        v-html="
          useDateString(
            props.data.created_at,
            props.data.updated_at,
            userController.lang,
          )
        "
      ></div>

      <!--------------------------------------
       Кнопки
      ---------------------------------------->
      <div class="btns" v-if="props.place">
        <template v-if="props.place === 'my'">
          <!-- Кнопки управления  -->
          <NuxtLink
            :to="`${teamController.activeTeamSlug}/articles/edit/${props.data.id}`"
            class="btn__item"
          >
            <i class="fa-regular fa-edit"></i>
            <p>{{ $t.item.edit }}</p>
          </NuxtLink>
        </template>
        <!-- Кнопка удаления из избранного -->
        <div
          class="btn__item2 btn__item2-remove"
          v-if="props.place === 'favorite'"
          @click="onRemoveFromFavorites"
        >
          <i class="fa-regular fa-plus-circle" />
          <p>{{ $t.item.removeFavorite }}</p>
        </div>
        <!-- Кнопка публикации -->
        <div
          class="btn__item2"
          v-if="props.place === 'moderation'"
          @click="onPublicArticle"
        >
          <i class="fa-regular fa-check-circle" />
          <p>{{ $t.item.publish }}</p>
        </div>
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
import { useUserStore } from '~/stores/UserController';

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
const emits = defineEmits(['removeFromFavorites', 'removeFromModeration']);

/**
 * Переменные ----------------
 */
const route = useRoute();
const teamController = useTeamStore();
const userController = useUserStore();
const $t = await useTranslate('items');

/**
 * Вычислительные значения ----------------
 */
// Ссылка на элемент
const link = computed(() => {
  if (props.data.status_id !== 1) {
    return `${
      teamController.activeTeam
        ? teamController.activeTeamSlug
        : `/companies/${props.data.team?.id}`
    }/${props.type === 'article' ? 'articles' : 'sections'}/${props.data.id}`;
  } else {
    return `${
      teamController.activeTeam
        ? teamController.activeTeamSlug
        : `/companies/${props.data.team?.id}`
    }/articles/draft/${props.data.id}`;
  }
});

/**
 * Методы ----------------
 */
// Удалить из избранного
const onRemoveFromFavorites = async () => {
  if (window.confirm($t.item.favoriteConfirm)) {
    const data = await useCustomFetch(`account/bookmarks/remove`, {
      body: { article_id: props.data.id },
      method: 'POST',
    });

    if (data) {
      emits('removeFromFavorites', props.data.id);
    }
  }
};
// Публикация статьи
const onPublicArticle = async () => {
  if (window.confirm($t.moder.confirm)) {
    const { data } = await useCustomFetch(`team/article/publish`, {
      body: { team_id: teamController.activeTeamId, article_id: props.data.id },
      method: 'POST',
    });

    if (data) {
      emits('removeFromModeration', props.data.id);
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
  i {
    font-size: 28px;
    width: 32px;
    height: 32px;
    margin-right: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  a {
    line-height: 26px;
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
    i {
      font-size: 14px;
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
    padding: 5px 10px;
    font-size: 13px;
    border-radius: 2px;
    transition: 0.2s;
    display: flex;
    align-items: center;
    cursor: pointer;
    i {
      font-size: 14px;
      width: 17px;
      height: 17px;
      margin-right: 7px;
    }
    p {
      color: $black;
    }
    &:hover {
      p {
        color: $blue;
      }
    }
    &.btn__item2-remove {
      i {
        transform: rotate(45deg);
      }
    }
  }
}
</style>
