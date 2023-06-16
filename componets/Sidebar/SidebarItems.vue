<template>
  <!--------------------------------------
  Основные разделы
  ---------------------------------------->
  <template
      v-if="!(route.path.includes('/sections') || route.path.includes('/posts'))"
  >
    <div class="items" v-if="sections?.length">
      <h3>Разделы</h3>
      <ul>
        <template v-for="section in sections" :key="section.id">
          <SidebarItem :data="section" type="section" />
        </template>
      </ul>
    </div>
  </template>

  <!--------------------------------------
  Разделы и посты внутри раздела
  ---------------------------------------->
  <template v-else>
    <!-- Разделы -->
    <div class="items">
      <h3 class="title">{{ sectionItemsStore.sectionName }}</h3>
      <ul>
        <template
            v-for="section in sectionItemsStore.sections"
            :key="section.id"
        >
          <SidebarItem :data="section" type="section" />
        </template>
      </ul>
    </div>

    <!-- Посты -->
    <div class="items" v-if="sectionItemsStore.posts?.length">
      <h3>Статьи</h3>
      <ul>
        <template v-for="post in sectionItemsStore.posts" :key="post.id">
          <SidebarItem :data="post" type="post" />
        </template>
      </ul>
    </div>
  </template>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useSectionItemsStore } from '~/stores/SectionItemsStore';
import { Api } from '~/api';
import { useCompanyStore } from '~/stores/CompanyStore';

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут
const sectionItemsStore = useSectionItemsStore(); // Хранилище разделов активной компании
const companyStore = useCompanyStore(); // Хранилище активной компании

/**
 * Получение данных ----------------
 */
// Список основных разделов
const { data: sections } = useAsyncData(async () => {
  if (route.path.includes('/companies')) {
    const params = {
      company_id: companyStore.activeCompany?.id,
    };
    const { data } = await Api().section.getAll(params);
    return data;
  }
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.items {
  margin-bottom: 49px;
  .title {
    color: $black;
    text-transform: none;
    font-size: 20px;
    line-height: 23px;
    margin-bottom: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  h3 {
    text-transform: uppercase;
    color: $gray;
    margin-bottom: 18px;
  }
}
</style>