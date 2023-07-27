<template>
  <div class="controls">
    <!-- Редактировать -->
    <div class="control" :title="$t.controls.edit" v-if="isAccessEdit">
      <NuxtLink
        :to="`${teamController.activeTeamSlug}/${
          elemController.type === 'section' ? 'sections' : 'articles'
        }/edit/${route.params.id}`"
      >
        <i class="fa-regular fa-edit" />
      </NuxtLink>
    </div>

    <!-- Закрепить -->
    <div
      class="control"
      :class="{ active: isSubscribed }"
      v-if="elemController.type === 'article'"
      @click="onSubscribe"
      :title="!isSubscribed ? $t.controls.subscribe : $t.controls.unsubscribe"
    >
      <i class="fa-regular fa-thumb-tack" />
    </div>

    <!-- Сгенерировать ссылку -->
    <div
      class="control"
      @click="elemController.openShare()"
      :title="$t.controls.share"
      v-if="elemController.type === 'article' && isAccessEdit"
    >
      <i class="fa-regular fa-share" />
    </div>

    <!-- Дополнительные возможности -->
    <div
      class="extra"
      ref="refPopup"
      :title="$t.controls.extra"
      v-if="isAccessEdit"
    >
      <div class="control" @click="isShowPopup = !isShowPopup">
        <i class="fa-regular fa-ellipsis-h" />
      </div>
      <ul class="popup" v-if="isShowPopup">
        <!-- Открыть историю статьи -->
        <li v-if="elemController.type === 'article'">
          <NuxtLink
            :to="`${teamController.activeTeamSlug}/articles/history/${elemController.article?.article.id}`"
          >
            <i class="fa-regular fa-history" />
            <p>{{ $t.controls.history }}</p>
          </NuxtLink>
        </li>

        <!-- Удалить элемент -->
        <li @click="onDelete">
          <i class="fa-regular fa-times-circle" />
          <p>
            {{
              elemController.type === 'section'
                ? $t.controls.removeSection
                : $t.controls.removeArticle
            }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { useElemStore } from '~/stores/ElemController';
import { useOutsideClick } from '~/hooks/useOutsideClick';
import { useUserStore } from '~/stores/UserController';

/**
 * Переменные ----------------
 */
const route = useRoute();
const router = useRouter();
const teamController = useTeamStore();
const elemController = useElemStore();
const userController = useUserStore();
const refPopup = ref(null);
const isShowPopup = ref(false);
const isSubscribed = ref(elemController.article?.properties.subscription);
const $t = await useTranslate('elem');

/**
 * Хуки ----------------
 */
useOutsideClick(refPopup, isShowPopup);

/**
 * Методы ----------------
 */
// Есть ли доступ для редактирования?
const isAccessEdit = computed(() => {
  const typeElem =
    elemController.type === 'article'
      ? elemController.article?.article?.creator.id
      : elemController.section?.creator.id;

  return userController.user.id === typeElem || teamController.isAccessEdit;
});

/**
 * Методы ----------------
 */
// Удаление элемента
const onDelete = async () => {
  // Подтверждение удаления
  if (
    window.confirm(
      `${
        elemController.type === 'section'
          ? $t.controls.confirmSection
          : $t.controls.confirmArticle
      }`,
    )
  ) {
    // Удаляем элемент
    const { data } = await useCustomFetch(
      `team/${
        elemController.type === 'section' ? 'section' : 'article'
      }/delete`,
      {
        body: {
          team_id: teamController.activeTeamId,
          ...(elemController.type === 'section' && {
            section_id: route.params.id,
          }),
          ...(elemController.type === 'article' && {
            article_id: route.params.id,
          }),
        },
        method: 'POST',
      },
    );

    // Перенаправляем пользователя
    await router.push(`${teamController.activeTeamId}/activity`);
  } else {
    // Закрываем попап
    isShowPopup.value = false;
  }
};

// Подписаться на статью
const subscribe = async () => {
  const { data } = await useCustomFetch(`subscribe/change`, {
    body: {
      team_id: teamController.activeTeamId,
      article_id: elemController.article?.article.id,
    },
    method: 'POST',
  });
  isSubscribed.value = !isSubscribed.value;
};

// Подписаться на статью
const onSubscribe = async () => {
  if (isSubscribed.value) {
    if (window.confirm('Вы точно хотите отписаться от статьи?')) {
      subscribe();
    }
  } else {
    subscribe();
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.controls {
  display: flex;
  align-items: center;
  height: 100%;
  margin: -24px 0;
  .control {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &:not(:last-child) {
      margin-right: 10px;
    }
    cursor: pointer;
    padding: 20px 9px;
    height: 100%;
    transition: 0.2s;
    &:hover {
      background-color: $blue2;
    }
    &.active {
      i {
        font-weight: 700;
      }
    }
  }
  i {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
  }
}

.extra {
  .control {
    margin-right: 0 !important;
  }
  .popup {
    top: 50px;
    right: 50px;
  }
}
</style>
