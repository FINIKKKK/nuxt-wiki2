<template>
  <div class="header">
    <NuxtLink :to="link" class="back">
      <i class="fa-regular fa-chevron-left"></i>
      <p>{{ $t.home.back }}</p>
    </NuxtLink>
    <div class="hamburger">
      <i
        :class="`fa-regular fa-${
          sidebarController.isActiveMap ? 'close' : 'align-justify'
        }`"
        @click="toggleOpen()"
      ></i>
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useSidebarStore } from '~/stores/SidebarController';
import { useTeamStore } from '~/stores/TeamContoller';
import { useSectionsStore } from '~/stores/SectionContoller';


/**
 * Переменные ----------------
 */
const route = useRoute();
const sidebarController = useSidebarStore();
const sectionsController = useSectionsStore();
const teamController = useTeamStore();
const $t = await useTranslate('sidebar');

/**
 * Вычисляемые значения ----------------
 */
// Какой именно компонент отображать?
const isShow = computed(
  () =>
    sidebarController.activeItem === 'home' &&
    (route.path.includes('/sections') || route.path.includes('/articles')),
);
// Ссылка назад
const link = computed(() => {
  if (sectionsController.breadCrumbs?.length !== 1) {
    return `${teamController.activeTeamSlug}/sections/${
      sectionsController.breadCrumbs[1]?.id ===
        sectionsController.section?.id && sectionsController.isArticle
        ? sectionsController.breadCrumbs[1]?.id
        : sectionsController.breadCrumbs[0]?.id
    }`;
  } else {
    return `${teamController.activeTeamSlug}`;
  }
});

/**
 * Методы ----------------
 */
// Открыть или закрыть карту разделов
const toggleOpen = () => {
  if (sidebarController.isActiveMap) {
    sidebarController.closeMap();
    if (isShow.value) {
      sidebarController.changeComponent('SidebarExtraItems');
    } else {
      sidebarController.changeComponent('SidebarMainItems');
    }
  } else {
    sidebarController.openMap();
    sidebarController.changeComponent('SidebarMap');
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 17.5px 15px;
  border-bottom: 1px solid $blue3;
  margin: -40px -30px 40px;
  .back {
    display: flex;
    align-items: center;
  }
  i {
    width: 15px;
  }
  .back {
    cursor: pointer;
    p {
      margin-left: 10px;
      transition: 0.3s;
      font-size: 14px;
      color: $black;
    }
    &:hover {
      text-decoration: none;
      p {
        color: $blue;
      }
    }
  }
  .hamburger {
    padding: 25px;
    margin: -17.5px -15px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid $blue3;
    i {
      cursor: pointer;
      margin: -20px;
    }
  }
}
</style>