<template>
  <NuxtLayout name="elem" type="section" :data="elemController.section">
    <!--------------------------------------
      Элементы раздела
    ---------------------------------------->
    <Item
      v-for="item in elemController.section?.child"
      :data="item"
      type="section"
      :key="item.id"
    />
    <template v-for="item in elemController.section?.items">
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
import { useUserStore } from '~/stores/UserController';
import { TArticle } from '~/utils/types/article';
import { useElemStore } from '~/stores/ElemController';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  isPublic?: boolean;
}>();

/**
 * Переменные ----------------
 */
const route = useRoute();
const teamController = useTeamStore();
const userController = useUserStore();
const elemController = useElemStore();

/**
 * Вычисляемые значения ----------------
 */
const isShowArticle = computed(() => (item: TArticle) => {
  if (item.status_id === 1) {
    return userController.user?.id === item.creator.id;
  } else if (item.status_id === 2) {
    return (
      userController.user?.id === item.creator.id || teamController.isAccessEdit
    );
  } else {
    return true;
  }
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
