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
      <SidebarHeader v-if="isShowHeader" />

      <!--------------------------------------
      ResolveComponent (SidebarMainItems, SidebarSearch, SidebarMap, SidebarExtraItems)
      ---------------------------------------->
      <component :is="currentComponent" />

      <!--------------------------------------
      Дополнительные элементы
      ---------------------------------------->
      <template v-if="isShow">
        <div class="items" v-if="sectionsController.sections?.length">
          <h3>{{ $t.home.sections }}</h3>
          <ul>
            <template
              v-for="section in sectionsController.sections"
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
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TSection } from '~/utils/types/secton';
import { TComponentItem } from '~/utils/types/base';
import { useSectionsStore } from '~/stores/SectionContoller';

/**
 * Переменные ----------------
 */
const route = useRoute();
const sidebarController = useSidebarStore();
const sectionsController = useSectionsStore();
const teamStore = useTeamStore();
const $t = await useTranslate('sidebar');
const components: TComponentItem = {
  SidebarMainItems: resolveComponent('SidebarMainItems'),
  SidebarSearch: resolveComponent('SidebarSearch'),
  SidebarExtraItems: resolveComponent('SidebarExtraItems'),
  SidebarMap: resolveComponent('SidebarMap'),
};

/**
 * Вычислительные значения ----------------
 */
// Показывать ли основные элементы?
const isShow = computed(() => {
  if (route.path.includes('/sections') || route.path.includes('/articles')) {
    return false;
  } else if (sidebarController.activeItem === 'home') {
    return true;
  } else {
    return false;
  }
});
// Показывать ли основные header?
const isShowHeader = computed(() => {
  return (
    (route.path.includes('/sections') || route.path.includes('/articles')) &&
    sidebarController.activeItem === 'home'
  );
});
// Текущий компонент
const currentComponent = computed(() => {
  if (sidebarController.currentComponent) {
    return (
      components[sidebarController.currentComponent] ||
      components.SidebarMainItems
    );
  } else {
    components.SidebarMainItems;
  }
});

/**
 * Получение данных ----------------
 */
if (!sectionsController.sections?.length || !sidebarController.isOpen) {
  // Список основных разделов
  const { data: sections } = await useCustomFetch<TSection[]>(
    `team/section/sections`,
    {
      query: { team_id: teamStore.activeTeamId },
    },
  );
  // Устанавливаем значения в хранилище
  sectionsController.setSections(sections);
}
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.sidebar__popup {
  position: relative;
  user-select: none;
  white-space: nowrap;
  width: 0px;
  opacity: 1;
  background-color: $bg;
  transition: 0.3s;
  transform: translateX(-100%);
  pointer-events: none;
  box-shadow: 0 0 10px rgba($blue, 0.2);
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
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
    color: $gray;
    margin-bottom: 10px;
  }
}
</style>
