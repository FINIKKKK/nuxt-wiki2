<template>
  <div class="controls">
    <!-- Редактировать -->
    <div class="control" title="Редактировать">
      <NuxtLink
        :to="`${teamController.activeTeamSlug}/${
          elemController.type === 'section' ? 'sections' : 'articles'
        }/edit/${route.params.id}`"
      >
        <svg-icon name="edit" />
      </NuxtLink>
    </div>

    <!-- Закрепить -->
    <div
      class="control"
      v-if="elemController.type === 'article'"
      @click="onSubscribe"
      :title="isSubscribed ? 'Отписаться' : 'Подписаться'"
    >
      <svg-icon :name="isSubscribed ? 'attach2' : 'attach'" />
    </div>

    <!-- Доступ -->
    <div
      class="control"
      @click="elemController.openAccessPopup()"
      title="Изменить доступ"
    >
      <svg-icon name="lock" />
    </div>

    <!-- Сгенерировать ссылку -->
    <div
      class="control"
      @click="elemController.toggleLinkPopup()"
      title="Поделиться"
    >
      <svg-icon name="share" />
    </div>

    <!-- Дополнительные возможности -->
    <div class="extra" ref="refPopup" title="Дополнительно">
      <div class="control" @click="isShowPopup = !isShowPopup">
        <svg-icon name="options" />
      </div>
      <ul class="popup" v-if="isShowPopup">
        <!-- Открыть историю статьи -->
        <li v-if="elemController.type === 'article'">
          <NuxtLink
            :to="`${teamController.activeTeamSlug}/articles/history/${elemController.article.article.id}`"
          >
            <svg-icon name="reverse" />
            <p>Журнал версий</p>
          </NuxtLink>
        </li>

        <!-- Удалить элемент -->
        <li @click="onDelete">
          <svg-icon name="remove" />
          <p>
            Удалить
            {{ elemController.type === 'section' ? 'раздел' : 'статью' }}
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

/**
 * Переменные ----------------
 */
const route = useRoute();
const router = useRouter();
const teamController = useTeamStore();
const elemController = useElemStore();
const refPopup = ref(null);
const isShowPopup = ref(false);
const isSubscribed = ref(elemController.article?.properties.subscription); //

/**
 * Хуки ----------------
 */
useOutsideClick(refPopup, isShowPopup);

/**
 * Методы ----------------
 */
// Удаление элемента
const onDelete = async () => {
  // Подтверждение удаления
  if (
    window.confirm(
      `Вы точно хотите удалить ${
        elemController.type === 'section' ? 'раздел' : 'статью'
      }?`,
    )
  ) {
    // Удаляем элемент
    const { data } = await useCustomFetch(`team/section/delete`, {
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
    });

    if (data.value) {
      // Перенаправляем пользователя
      await router.push(`${teamController.activeTeamId}`);
      // Закрываем попап
      isShowPopup.value = false;
    }
  } else {
    // Закрываем попап
    isShowPopup.value = false;
  }
};

const subscribe = async () => {
  const { data } = await useCustomFetch(`subscribe/change`, {
    body: {
      team_id: teamController.activeTeamId,
      article_id: elemController.article.article.id,
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
  }
  svg {
    width: 20px;
    height: 20px;
    fill: $blue;
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
