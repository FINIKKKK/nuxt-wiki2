<template>
  <h3 class="title">
    {{ $t.search.title }} {{ teamController.activeTeam?.team.name }}.itl.kz
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
      <SidebarItem
        v-for="article in searchData?.articles"
        :key="article.id"
        :data="article"
        type="article"
        class="item"
      />
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
import debounce from 'lodash.debounce';
import { TSearchData, TSearchResults } from '~/utils/types/sidebar';


/**
 * Переменные ----------------
 */
const teamController = useTeamStore();
const searchData = ref<TSearchResults | null>(null);
const searchValue = ref('');
const $t = await useTranslate('sidebar');

/**
 * Методы ----------------
 */
// Поиск пользователей, разделов, статей
const onSearch = debounce(async () => {
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
