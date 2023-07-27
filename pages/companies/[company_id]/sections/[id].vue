<template>
  <NuxtLayout name="elem" type="section" :data="section.section">
    <!--------------------------------------
      Элементы раздела
    ---------------------------------------->
    <Item
      v-for="item in section.section.child"
      :data="item"
      type="section"
      :key="item.id"
    />
    <template v-for="item in section.section.items">
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
import { useSectionsStore } from '~/stores/sectionsController';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TSectionData } from '~/utils/types/secton';
import { useUserStore } from '~/stores/UserController';
import { TArticle } from '~/utils/types/article';
import { useElemStore } from '~/stores/ElemController';

/**
 * Переменные ----------------
 */
const route = useRoute();
const teamController = useTeamStore();
const userController = useUserStore();
const sectionsController = useSectionsStore();
const elemController = useElemStore();

/**
 * Получение данных ----------------
 */
const { data: section } = await useCustomFetch<TSectionData>(`team/section`, {
  query: {
    team_id: teamController.activeTeamId,
    section_id: route.params.id,
  },
});
// Сохраняем в хранилище
elemController.setSection(section.section);
sectionsController.setBreadCrumbs(section.section.breadcrumbs);
elemController.changeTypeElem('section');

/**
 * Вычисляемые значения ----------------
 */
const isShowArticle = computed(() => (item: TArticle) => {
  if (item.status_id === 1) {
    return userController.user?.id === item.creator.id;
  } else if (item.status_id === 2) {
    return userController.user?.id === item.creator.id || teamController.isAccessEdit;
  } else {
    return true;
  }
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
