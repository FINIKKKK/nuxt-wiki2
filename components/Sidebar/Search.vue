<template>
  <!--------------------------------------
   Поле ввода
  ---------------------------------------->
  <UIInput
    class="input"
    label="Искать статью, раздел или пользователя"
    v-model="searchValue"
    @input="onSearch"
  />

  <!--------------------------------------
   Результаты поиска
  ---------------------------------------->
  <!-- Список статей -->
  <div class="list" v-if="searchData?.articles.length">
    <h4>Статьи</h4>
    <ul>
      <SidebarItem
        v-for="article in searchData?.articles"
        :key="article.id"
        :data="article"
        type="article"
      />
    </ul>
  </div>

  <!-- Список разделов -->
  <div class="list" v-if="searchData?.sections.length">
    <h4>Раделы</h4>
    <ul>
      <SidebarItem
        v-for="section in searchData?.sections"
        :key="section.id"
        :data="section"
        type="section"
      />
    </ul>
  </div>

  <!-- Список пользователей -->
  <div class="list" v-if="searchData?.users.length">
    <h4>Пользователи</h4>
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
import debounce from 'lodash/debounce';
import { TSearchData, TSearchResults } from '~/utils/types/sidebar';

/**
 * Системные переменные ----------------
 */
const teamController = useTeamStore(); // Хранилище команд
const searchData = ref<TSearchResults | null>(null); //

/**
 * Пользовательские переменные ----------------
 */
const searchValue = ref(''); // Значение поиска

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
    if (data.value) {
      searchData.value = data.value.results;
    }
  } else {
    searchData.value = null;
  }
}, 250);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.list {
  &:not(:last-child) {
    margin-bottom: 25px;
  }
  h4 {
    color: $gray;
    text-transform: uppercase;
    margin-bottom: 18px;
  }
}
</style>
