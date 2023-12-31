<template>
  <h3 class="title">
    {{ $t.search.title }} {{ teamController.activeTeam?.team.name }}.itl.wiki
  </h3>

  <!--------------------------------------
   Поле ввода
  ---------------------------------------->
  <UIInput
    class="search__input"
    :label="$t.search.input"
    v-model="searchValue"
    @input="onSearch"
  />

  <!--------------------------------------
   Результаты поиска
  ---------------------------------------->
  <!-- Список статей -->
  <div class="list" v-if="searchData?.articles.length">
    <h4>{{ $t.search.articles }}</h4>
    <ul>
      <template v-for="article in searchData?.articles">
        <SidebarItem
          :key="article.id"
          :data="article"
          type="article"
          class="item"
          v-if="isShowItem(article.created_by, article.status_id)"
        />
      </template>
    </ul>
  </div>

  <!-- Список разделов -->
  <div class="list" v-if="searchData?.sections.length">
    <h4>{{ $t.search.sections }}</h4>
    <ul>
      <SidebarItem
        v-for="section in searchData?.sections"
        :key="section.id"
        :data="section"
        type="section"
        class="item"
      />
    </ul>
  </div>

  <!-- Список пользователей -->
  <div class="list" v-if="searchData?.users.length">
    <h4>{{ $t.search.users }}</h4>
    <ul>
      <User v-for="user in searchData?.users" :key="user.id" :data="user" />
    </ul>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TSearchData, TSearchResults } from '~/utils/types/sidebar';
import { useUserStore } from '~/stores/UserController';
import { useDebounce } from '~/hooks/useDebounce';

/**
 * Переменные ----------------
 */
const teamController = useTeamStore();
const searchData = ref<TSearchResults | null>(null);
const searchValue = ref('');
const userController = useUserStore();
const $t = await useTranslate('sidebar');

/**
 * Вычисляемое ----------------
 */
// Показывать ли статью в поиске?
const isShowItem = computed(() => (creatorId: number, statusId: number) => {
  if (statusId === 1) {
    return userController.user?.id === creatorId;
  } else if (statusId === 2) {
    return userController.user?.id === creatorId || teamController.isAccessEdit;
  } else {
    return true;
  }
});

/**
 * Методы ----------------
 */
// Поиск пользователей, разделов, статей
const onSearch = useDebounce(async () => {
  if (searchValue.value) {
    const { data } = await useCustomFetch<TSearchData>(`team/search`, {
      query: {
        team_id: teamController.activeTeamId,
        query: searchValue.value,
        type: 'all',
      },
    });
    if (data) {
      searchData.value = data.results;
    }
  } else {
    searchData.value = null;
  }
}, 250);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.title {
  font-size: 20px;
  line-height: 23px;
  margin-bottom: 30px;
}

.item {
  margin-bottom: 5px;
}

.list {
  &:not(:last-child) {
    margin-bottom: 25px;
  }
  h4 {
    color: $gray;
    margin-bottom: 15px;
  }
}
</style>

<style lang="scss">
.search__input {
  .inner label {
    background-color: $bg !important;
  }
}
</style>
