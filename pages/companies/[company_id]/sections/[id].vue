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
    <template v-for="item in data.section.items">
      <Item
        :data="item"
        type="article"
        :key="item.id"
        v-if="isShowArticle(item)"
      />
    </template>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useSectionsStore } from '~/stores/SectionContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TSectionData } from '~/utils/types/secton';
import { useUserStore } from '~/stores/UserController';

/**
 * Переменные ----------------
 */
const route = useRoute();
const teamController = useTeamStore();
const userController = useUserStore();
const sectionsController = useSectionsStore();

/**
 * Получение данных ----------------
 */
const { data } = await useCustomFetch<TSectionData>(`team/section`, {
  query: {
    team_id: teamController.activeTeamId,
    section_id: route.params.id,
  },
});
// Сохраняем в хранилище
sectionsController.setSection(data.value.section);
sectionsController.setBreadCrumbs(data.value.section.breadcrumbs);
sectionsController.setIsArticle(false);

/**
 * Вычисляемые значения ----------------
 */
const isShowArticle = computed(() => (item) => {
  if (item.status_id === 1) {
    return userController.user.id === item.creator.id;
  } else if (item.status_id === 2) {
    return (
      teamController.activeTeam.role.id === 1 ||
      teamController.activeTeam.role.id === 2
    );
  } else {
    return true;
  }
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
