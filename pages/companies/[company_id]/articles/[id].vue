<template>
  <NuxtLayout
    name="elem"
    type="article"
    :data="data.article"
    :properties="data.properties"
  >
    <ul class="tabs">
      <li
        class="tab"
        v-for="(tab, index) in data.article.tabs"
        :key="index"
        @click="activeTab = index"
        :class="{ active: index === activeTab }"
      >
        {{ tab.name }}
      </li>
    </ul>

    <div class="content" v-for="(tab, index) in data.article.tabs">
      <EditorBody :key="index" :data="[]" />
    </div>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useSectionsStore } from '~/stores/SectionContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TArticleData } from '~/utils/types/article';
import { TSectionData } from '~/utils/types/secton';

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут
const teamController = useTeamStore(); // Хранилище активной команды
const sectionsController = useSectionsStore(); // Хранилище разделов

/**
 * Полльзовательские переменные ----------------
 */
const activeTab = ref(0); // Активная вкладка

/**
 * Получение данных ----------------
 */
// Данные раздела
const { data } = await useCustomFetch<TArticleData>(`team/article`, {
  query: {
    team_id: teamController.activeTeamId,
    article_id: route.params.id,
  },
});
if (!sectionsController.section) {
  // Получаем данные раздела
  const { data: section } = await useCustomFetch<TSectionData>(`team/section`, {
    query: {
      team_id: teamController.activeTeamId,
      section_id: data.value.article.section.id,
    },
  });
  // Сохраняем в хранилище
  sectionsController.setSection(section.value.section);
  sectionsController.setParent1({
    id: section.value.section.id,
    name: section.value.section.name,
  });
  sectionsController.setIsChild(true);
}
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.tabs {
  display: flex;
  align-items: center;
  border: 1px solid rgba($blue, 0.2);
  padding: 0 20px;
  border-radius: 2px;
  .tab {
    padding: 12px 15px;
    border-radius: 5px 5px 0 0;
    cursor: pointer;
    color: $gray;
    border-bottom: 1px solid transparent;
    &.active {
      color: $blue;
      border-bottom: 1px solid $blue;
    }
  }
}
</style>
