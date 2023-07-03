<template>
  <div class="header">
    <div class="back">
      <svg-icon name="back" />
      <p>Назад</p>
    </div>
    <svg-icon
      :name="sidebarController.isActiveMap ? 'close' : 'hamburger'"
      class="hamburger"
      @click="toggleOpen()"
    />
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useSidebarStore } from '~/stores/SidebarController';

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут
const sidebarController = useSidebarStore(); // Хранилище сайдбара

/**
 * Вычисляемые значения ----------------
 */
// Какой именно компонент отображать0
const isShow = computed(
  () =>
    sidebarController.activeItem === 'home' &&
    (route.path.includes('/sections') || route.path.includes('/articles')),
);

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
  padding: 15px;
  border-bottom: 1px solid rgba($black, 0.1);
  margin: -40px -30px 40px;
  .back {
    display: flex;
    align-items: center;
  }
  svg {
    width: 15px;
    height: 15px;
  }
  .back {
    cursor: pointer;
    p {
      margin-left: 10px;
      transition: 0.3s;
      font-size: 14px;
    }
    &:hover {
      p {
        color: $blue;
      }
    }
  }
  .hamburger {
    cursor: pointer;
  }
}
</style>
