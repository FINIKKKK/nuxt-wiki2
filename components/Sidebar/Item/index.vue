<template>
  <!--------------------------------------
  ResolveComponent (SidebarItemMain, SidebarItemElem)
  ---------------------------------------->
  <component :is="currentComponent" :data="props.data" :type="props.type" />
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { TItem } from '~/utils/types/sidebar';
import { TArticle } from '~/utils/types/article';
import { TSection } from '~/utils/types/secton';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  data: TItem | TArticle | TSection;
  type?: 'article' | 'section';
}>();

/**
 * Пользовательские переменные ----------------
 */
// Компоненты для resolveComponent
const components = {
  SidebarItemMain: resolveComponent('SidebarItemMain'),
  SidebarItemElem: resolveComponent('SidebarItemElem'),
};
// Текущий компонент
const currentComponent = shallowRef(components.SidebarItemMain);

/**
 * Вычисляемые значения ----------------
 */
onMounted(() => {
  if (props.type) {
    currentComponent.value = components['SidebarItemElem'];
  }
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss">
.sidebar__item {
  margin-left: -16px;
  cursor: pointer;
  transition: 0.3s;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
  a {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    border-radius: 3px;
    &.router-link-active {
      background-color: $blue3;
      p {
        color: $blue;
      }
    }
  }
  i {
    width: 25px;
    font-size: 20px;
    margin-right: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  p {
    font-size: 14px;
    line-height: 20px;
    color: $black;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: 0.3s;
  }
  &:hover {
    background-color: $blue3;
    a {
      text-decoration: none;
    }
    p {
      color: $blue;
    }
    &.elem {
      a::before {
        background-color: $blue;
      }
    }
  }
  &.elem {
    a::before {
      content: '';
      width: 5px;
      height: 5px;
      border-radius: 50%;
      margin-right: 10px;
      background-color: $black;
      flex: 0 0 auto;
      transition: 0.3s;
    }
  }
}
</style>
