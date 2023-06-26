<template>
  <div
    class="sidebar__popup"
    :class="{
      active: sidebarController.isOpen, // Если сайдбар открыт
      search: sidebarController.activeItem === 'search', // Если открыт поиск
    }"
  >
    <div class="inner">
      <!--------------------------------------
      ResolveComponent (SidebarMainItems, SidebarSearch)
      ---------------------------------------->
      <component
        :is="sidebarController.currentComponent"
        v-if="isShowMainItems"
      />

      <!--------------------------------------
      Дополнительные элементы
      ---------------------------------------->
      <SidebarExtraItems v-if="sidebarController.activeItem === 'home'" />
    </div>
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
 * Вычислительные значения ----------------
 */
// Показывать ли основные элементы ?
const isShowMainItems = computed(() => {
  return (
    sidebarController.activeItem !== 'home' ||
    !(route.path.includes('/sections') || route.path.includes('/articles'))
  );
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.sidebar__popup {
  position: relative;
  user-select: none;
  white-space: nowrap;
  z-index: 30;
  width: 0px;
  opacity: 1;
  background-color: $bg;
  transition: 0.3s;
  transform: translateX(-100%);
  pointer-events: none;
  box-shadow: 0 0 10px rgba($blue, 0.2);
  .inner {
    padding: 41px 30px;
    opacity: 0;
    transition: 0.3s;
  }
  &.active {
    width: 300px;
    transform: translateX(0px);
    pointer-events: visible;
    .inner {
      opacity: 1;
    }
  }
}

.sidebar__popup.search {
  width: 550px;
  .input {
    input {
      font-size: 16px;
    }
  }
}

.items {
  margin-bottom: 49px;
  h3 {
    text-transform: uppercase;
    color: $gray;
    margin-bottom: 18px;
  }
}
</style>
