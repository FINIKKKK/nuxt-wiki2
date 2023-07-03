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
import SidebarMain from '~/components/Sidebar/Main.vue';
import SidebarPopup from '~/components/Sidebar/Popup.vue';
import { useOutsideClick } from '~/hooks/useOutsideClick';
import { useSidebarStore } from '~/stores/SidebarController';

/**
 * Пользовательские переменные ----------------
 */
const popupRef = ref(null); // Ref-ссылка на элемент попапа
const sidebarController = useSidebarStore(); // Хранилище сайдбара

/**
 * Хуки ----------------
 */
// Скрывать попап, если нажатие было вне его области
useOutsideClick(popupRef, null, () => {
  sidebarController.close();
});
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
