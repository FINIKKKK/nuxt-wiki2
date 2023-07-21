<template>
  <div class="main">
    <!-- Warning -->
    <UIWarning
      v-if="successMessage"
      :message="successMessage"
      class="warning"
    />

    <!--------------------------------------
      Шапка элемента
    ---------------------------------------->
    <div class="elem__header">
      <!-- Заголовок -->
      <h1 class="title">{{ article.article.name }}</h1>
    </div>

    <!--------------------------------------
      Информация об элементе
    ---------------------------------------->
    <ul class="elem__info">
      <!-- Автор -->
      <li class="elem__info-item">
        {{ $t.author }}:
        <span>{{ `${history.creator.fullname}` }}</span>
      </li>
      <!-- Время -->
      <li
        class="elem__info-item"
        v-html="
          useDateString(
            article.article.created_at,
            article.article.updated_at,
            userController.lang,
          )
        "
      ></li>
    </ul>

    <!--------------------------------------
      Вкладки
    ---------------------------------------->
    <ElemPageTabs
      :tabs="article.article.tabs"
      :isHistory="true"
      @activeTab="setActiveTab"
    />
  </div>

  <!--------------------------------------
    Журнал версий
  ---------------------------------------->
  <AsidePopup :title="$t.popup.title" :isOpen="true" class="aside">
    <ul class="list">
      <li v-if="activeHistory">
        <div class="info">
          <div class="date">
            {{ useFormatDate(activeHistory.created_at, userController.lang) }}
          </div>
          <div class="author">{{ activeHistory.creator.fullname }}</div>
        </div>
        <div class="btn btn2 tag" v-if="true">
          <p>{{ $t.popup.current }}</p>
        </div>
        <div class="btn btn2" v-else @click="onRollback">
          <p>{{ $t.popup.recover }}</p>
          <i class="fa-regular fa-refresh" />
        </div>
      </li>
    </ul>
  </AsidePopup>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { TArticleData } from '~/utils/types/article';
import { useDateString } from '~/hooks/useDateString';
import { useUserStore } from '~/stores/UserController';
import AsidePopup from '~/components/UI/AsidePopup.vue';
import { useFormatDate } from '~/hooks/useFormatData';

/**
 * Переменные ----------------
 */
const teamController = useTeamStore();
const route = useRoute();
const userController = useUserStore();
const successMessage = ref('');
const activeTab = ref({
  index: 0,
  id: null,
});
const activeHistory = ref(null);
const $t = await useTranslate('history');

/**
 * Получение данных ----------------
 */
const { data: article } = await useCustomFetch<TArticleData>(
  `team/article/edit`,
  {
    query: {
      team_id: teamController.activeTeamId,
      article_id: route.params.id,
    },
  },
);
// История вкладки
const { data: history } = await useCustomFetch(`team/article/tab/history`, {
  query: {
    team_id: teamController.activeTeamId,
    tab_id: article.article.tabs[0].id,
  },
});
activeHistory.value = history;

/**
 * Методы ----------------
 */
// Сменить активную вкладку (событие)
const setActiveTab = async ({ index, id }) => {
  activeTab.value.index = index;
  activeTab.value.id = id;

  const { data: history } = await useCustomFetch(`team/article/tab/history`, {
    query: {
      team_id: teamController.activeTeamId,
      tab_id: activeTab.value.id,
    },
  });
  activeHistory.value = history;
};

// Откатить историю вкладки
const onRollback = async () => {
  const { message } = await useCustomFetch(
    `team/article/tab/history/rollback`,
    {
      body: {
        team_id: teamController.activeTeamId,
        tab_id: activeTab.value.id,
        history_id: activeHistory.id,
      },
      method: 'POST',
    },
  );

  if (message) {
    successMessage.value = 'Success!';
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.warning {
  margin: -35px -75px 35px !important;
}

.main {
  width: calc(100% - 500px);
  overflow: auto;
  padding: 75px;
  height: 100vh;
  .elem__header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    position: relative;
  }
  .title {
    font-size: 24px;
    line-height: 28px;
  }
  .elem__info {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }
  .elem__info-item {
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
}

.history {
  position: relative;
  top: auto;
  right: auto;
  transform: none;
  width: 30%;
}

.list {
  li {
    padding: 16px 32px;
    transition: 0.2s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .author {
      color: $gray;
    }
    .btn {
      display: flex;
      align-items: center;
      padding: 7px 17px;
      background-color: $blue3;
      p {
        font-size: 14px;
      }
      svg {
        width: 13px;
        height: 13px;
        margin-left: 10px;
      }
      &:hover {
        background-color: $blue2;
      }
    }
    &:hover {
      background-color: $blue3;
    }
  }
}
</style>

<style lang="scss">
.aside-popup__wrapper {
  display: none;
}

.btn {
  cursor: pointer;
  i {
    margin-left: 10px;
    font-size: 14px;
  }
}

.tag {
  pointer-events: none;
}
</style>