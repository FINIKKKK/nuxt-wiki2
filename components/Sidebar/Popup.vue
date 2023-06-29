<template>
  <div
    class="sidebar__popup"
    :class="{
      active: sidebarController.isOpen, // Если сайдбар открыт
      search: sidebarController.activeItem === 'search', // Если открыт поиск
    }"
  >
    <div class="inner">
      <!-- Кнопки в шапке -->
      <SidebarHeader v-if="isPathElem" />

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
      <template v-if="!isPathElem">
        <div class="items" v-if="sidebarController.sections?.length">
          <h3>Разделы</h3>
          <ul>
            <template
              v-for="section in sidebarController.sections"
              :key="section.id"
            >
              <SidebarItem :data="section" type="section" />
            </template>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useSidebarStore } from '~/stores/SidebarController';
import { useTeamStore } from '~/stores/TeamContoller';
import { useGetData } from '~/hooks/useGetData';

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут
const sidebarController = useSidebarStore(); // Хранилище сайдбара
const teamStore = useTeamStore(); // Хранилище активной команды

/**
 * Вычислительные значения ----------------
 */
// Показывать ли основные элементы ?
// Страница элемента?
const isPathElem = computed(() => {
  return route.path.includes('/sections') || route.path.includes('/articles');
});
const isShowMainItems = computed(() => {
  return sidebarController.activeItem !== 'home' || !isPathElem;
});

/**
 * Получение данных ----------------
 */
// Список основных разделов
const { data: sections } = await useGetData(`team/section/sections`, {
  query: { team_id: teamStore.activeTeam?.team.id },
});
// Устанавливаем значения в хранилище
sidebarController.setSections(sections.value);
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
