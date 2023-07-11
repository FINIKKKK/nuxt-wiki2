<template>
  <div class="flex">
    <div class="content">
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
          Автор:
          <span>{{ `${article.article.creator.fullname}` }}</span>
        </li>
        <!-- Время -->
        <li
          class="elem__info-item"
          v-html="
            useDateString(
              article.article.created_at,
              article.article.updated_at,
            )
          "
        ></li>
      </ul>

      <!--------------------------------------
        Вкладки
      ---------------------------------------->
      <ElemPageTabs :tabs="article.article.tabs" />
    </div>

    <div class="history aside-popup">
      <h3 class="title">Журнал версий</h3>
      <ul class="list">
        <li>
          <div class="info">
            <div class="date">Вчера в 17:26</div>
            <div class="author">Аскарова Асель</div>
          </div>
          <div class="btn btn2" v-if="false">
            <p>Текущая версия</p>
            <svg-icon name="check" />
          </div>
          <button class="btn btn2">
            <p>Востановить</p>
            <svg-icon name="reverse" />
          </button>
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
import { TArticleData } from '~/utils/types/article';
import { useDateString } from '~/hooks/useDateString';

const teamController = useTeamStore();
const route = useRoute();

const { data: article } = await useCustomFetch<TArticleData>(`team/article`, {
  query: {
    team_id: teamController.activeTeamId,
    article_id: route.params.id,
  },
});
// const { data } = await useCustomFetch(`team/article/tab/history`, {
//   query: { team_id: teamController.activeTeamId, tab_id: 547 },
// });
// console.log(data.value);
// console.log(data.value.content);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.flex {
  display: flex;
  width: 100%;
}

.content {
  width: 70%;
  padding: 75px;
  .elem__header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    position: relative;
    svg {
      width: 20px;
      height: 20px;
      position: absolute;
      left: -25px;
      cursor: pointer;
    }
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
