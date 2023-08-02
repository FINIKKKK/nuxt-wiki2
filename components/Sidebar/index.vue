<template>
  <aside class="sidebar" tabindex="1" @blur="onOutsideClick" id="sidebar">
    <nav class="nav">
      <!-- Главный сайдбар -->
      <SidebarMain />

      <!-- Внутрениий сайдбар -->
      <SidebarPopup />
    </nav>
  </aside>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import SidebarMain from '~/components/Sidebar/Main.vue';
import SidebarPopup from '~/components/Sidebar/Popup.vue';
import { useSidebarStore } from '~/stores/SidebarController';

/**
 * Переменные ----------------
 */
const route = useRoute();
const sidebarController = useSidebarStore();

/**
 * Вычисляемые значения ----------------
 */
// Показывать ли элементы?
const isShow = computed(
  () =>
    sidebarController.activeItem === 'home' &&
    (route.path.includes('/sections') || route.path.includes('/articles')),
);

// Какой элемент отображать в сайдбар изначально
const homePages = [
  '/moderation',
  '/my_works',
  '/activity',
  '/sections',
  '/articles',
];
const settingsPages = ['/settings'];
if (homePages.some((page) => route.path.includes(page))) {
  sidebarController.open('home');
} else if (settingsPages.some((page) => route.path.includes(page))) {
  sidebarController.open('cog');
} else if (route.fullPath.includes('billing')) {
  sidebarController.open('bank');
} else {
  sidebarController.close();
}
if (isShow.value) {
  sidebarController.changeComponent('SidebarExtraItems');
  sidebarController.closeMap();
} else {
  sidebarController.closeMap();
  sidebarController.changeComponent('SidebarMainItems');
}

/**
 * Методы ----------------
 */
// Скрывать попап, если нажатие было вне его области
const onOutsideClick = () => {
  const pages = ['/companies', '/account'];
  if (!pages.some((page) => route.path.includes(page))) {
    sidebarController.close();
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.sidebar {
  z-index: 200;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .nav {
    display: flex;
    height: 100%;
  }
}
</style>
