<template>
  <div class="controls">
    <!-- Опубликовать статью (если на модерации) -->
    <div
      class="control"
      v-if="
        elemController.type === 'article' &&
        teamController.isAccessEdit &&
        elemController.article.article.status_id === 2
      "
      @click="onPublicArticle"
      :title="$t.controls.moder"
    >
      <i class="fa-regular fa-check-circle" />
    </div>

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
      v-if="isAccessEdit"
    >
      <i class="fa-regular fa-share" />
    </div>

    <!-- Доступ пользователей и групп -->
    <div
      class="control"
      v-if="isAccessEdit && elemController.type === 'article'"
      @click="elemController.openAccess()"
      :title="$t.controls.access"
    >
      <i class="fa-regular fa-lock" />
    </div>

    <!-- Дополнительные возможности -->
    <div
      class="extra"
      tabindex="1"
      @blur="isShowPopup = false"
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
import { useUserStore } from '~/stores/UserController';

/**
 * Переменные ----------------
 */
const route = useRoute();
const router = useRouter();
const teamController = useTeamStore();
const elemController = useElemStore();
const userController = useUserStore();
const isShowPopup = ref(false);
const isSubscribed = ref(elemController.article?.properties.subscription);
const $t = await useTranslate('elem');

/**
 * Вычисляемое ----------------
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
    const { message } = await useCustomFetch(
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

    if (message) {
      // Перенаправляем пользователя
      await router.push(`${teamController.activeTeamId}/activity`);
    }
  } else {
    // Закрываем попап
    isShowPopup.value = false;
  }
};

// Подписаться на статью
const subscribe = async () => {
  const { message } = await useCustomFetch(`subscribe/change`, {
    body: {
      team_id: teamController.activeTeamId,
      article_id: elemController.article?.article.id,
    },
    method: 'POST',
  });

  if (message) {
    isSubscribed.value = !isSubscribed.value;
  }
};

// Подписаться на статью
const onSubscribe = async () => {
  if (isSubscribed.value) {
    if (window.confirm($t.controls.unsubscribeConfirm)) {
      subscribe();
    }
  } else {
    subscribe();
  }
};

// Публикация статьи
const onPublicArticle = async () => {
  if (window.confirm($t.moder.confirm)) {
    const { message } = await useCustomFetch(`team/article/publish`, {
      body: {
        team_id: teamController.activeTeamId,
        article_id: route.params.id,
      },
      method: 'POST',
    });

    if (message) {
    }
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
