<template>
  <aside class="sidebar" ref="popupRef">
    <nav class="nav">
      <!-- Главный сайдбар -->
      <SidebarMain
        :activeItem="activeItem as string | null"
        @setActiveItem="setActiveItem"
      />

      <!-- Внутрениий сайдбар -->
      <SidebarPopup
        :isShow="isShowPopup as boolean"
        :activeItem="activeItem as string | null"
      />
    </nav>
  </aside>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import SidebarMain from '~/components/Sidebar/SidebarMain.vue';
import SidebarPopup from '~/components/Sidebar/SidebarPopup.vue';
import { useOutsideClick } from '~/hooks/useOutsideClick';
import { useSidebarStore } from '~/stores/SidebarController';

/**
 * Вычислительные значения ----------------
 */
// Какой элемент отображать в sidebar изначально
const getActiveItem = () => {
  const homePages = [
    '/companies',
    '/moderation',
    '/my_works',
    '/sections',
    '/articles',
  ];
  const settingsPages = ['/settings'];

  if (settingsPages.some((page) => route.path.includes(page))) {
    return 'settings';
  }
  if (homePages.some((page) => route.path.includes(page))) {
    return 'home';
  }

  return null; // Если ни одно условие не выполняется, возвращаем null
};

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут

/**
 * Пользовательские переменные ----------------
 */
const popupRef = ref(null); // Ref-ссылка на элемент попапа
const isShowPopup = ref<boolean>(!!route.path.includes('/companies/') || true); // Показывать попап сайдара или нет?
const activeItem = ref<string | null>(getActiveItem()); // Активный элемент в сайдаре
const sidebarController = useSidebarStore(); // Хранилище

/**
 * Хуки ----------------
 */
// Скрывать попап, если нажатие было вне его области
// + Обнулять активный элемент
useOutsideClick(popupRef, isShowPopup, () => {
  activeItem.value = null;
});

/**
 * Методы ----------------
 */
// Выбрать элемент в сайдбаре
const openSidebar = (item: string) => {
  // Если он уже активный, то обнуляем его и закрываем попап
  if (sidebarController.activeItem === item) {
    sidebarController.close();
  }
  // Иначе делаем его активный и открываем попап
  else {
    sidebarController.open(item);
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.sidebar {
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
