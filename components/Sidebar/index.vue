<template>
  <aside class="sidebar" ref="popupRef">
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
import SidebarMain from '~/components/Sidebar/SidebarMain.vue';
import SidebarPopup from '~/components/Sidebar/SidebarPopup.vue';
import { useOutsideClick } from '~/hooks/useOutsideClick';
import { useSidebarStore } from '~/stores/SidebarController';
/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут

/**
 * Пользовательские переменные ----------------
 */
const popupRef = ref(null); // Ref-ссылка на элемент попапа
const sidebarController = useSidebarStore(); // Хранилище

/**
 * Хуки ----------------
 */
// Скрывать попап, если нажатие было вне его области
// + Обнулять активный элемент
// useOutsideClick(popupRef, isShowPopup, () => {
//   activeItem.value = null;
// });
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
