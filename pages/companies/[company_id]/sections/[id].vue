<template>
  <NuxtLayout name="elem" type="section" :data="data.section">
    <!--------------------------------------
      Элементы раздела
    ---------------------------------------->
    <Item
      v-for="item in data.section.child"
      :data="item"
      type="section"
      :key="item.id"
    />
    <Item
      v-for="item in data.section.items"
      :data="item"
      type="article"
      :key="item.id"
    />
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useSectionsStore } from '~/stores/SectionContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TSectionData } from '~/utils/types/secton';

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут
const teamController = useTeamStore(); // Хранилище активной команды
const sectionsController = useSectionsStore(); // Хранилище разделов

/**
 * Получение данных ----------------
 */
// Данные раздела
const { data } = await useCustomFetch<TSectionData>(`team/section`, {
  query: {
    team_id: teamController.activeTeamId,
    section_id: route.params.id,
  },
});
console.log(data.value);

// Сохраняем в хранилище
sectionsController.setSection(data.value.section);
sectionsController.setBreadCrumbs(data.value.section.breadcrumbs);
sectionsController.setIsArticle(false);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
