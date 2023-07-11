<template>
  <aside class="sidebar" ref="popupRef" id="sidebar">
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
import { useOutsideClick } from '~/hooks/useOutsideClick';
import { useSidebarStore } from '~/stores/SidebarController';

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут
const sidebarController = useSidebarStore(); // Хранилище сайдбара

/**
 * Пользовательские переменные ----------------
 */
const popupRef = ref(null); // Ref-ссылка на элемент попапа

/**
 * Хуки ----------------
 */
// Скрывать попап, если нажатие было вне его области
useOutsideClick(popupRef, null, () => {
  const pages = [
    '/account',
    '/settings',
    '/moderation',
    '/my_works',
    '/sections',
    '/articles',
    '/companies',
  ];
  if (!pages.some((page) => route.path.includes(page))) {
    sidebarController.close();
  }
});

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
onMounted(() => {
  const homePages = ['/moderation', '/my_works', '/sections', '/articles'];
  const settingsPages = ['/settings'];

  if (homePages.some((page) => route.path.includes(page))) {
    sidebarController.open('home');
  } else if (
    !homePages.some((page) => route.path.includes(page)) &&
    route.path.includes('/companies')
  ) {
    sidebarController.open('home');
  } else if (settingsPages.some((page) => route.path.includes(page))) {
    sidebarController.open('settings');
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
});
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
