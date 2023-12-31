<template>
  <main>
    <!-- Сайдбар -->
    <Sidebar />

    <div class="content__wrapper" :class="{ nonav: !nav }">
      <!-- Навигация -->
      <div class="header" v-if="props.nav" ref="refHeader">
        <nav class="nav">
          <template v-for="item in nav">
            <div class="nav__item" v-if="item?.label">
              <NuxtLink :to="item.link">{{ item.label }}</NuxtLink>
              <i class="fa-regular fa-chevron-right"></i>
            </div>
          </template>
        </nav>

        <ElemPageControls v-if="isShowControls" />

        <BillingBalance v-if="route.fullPath.includes('billing')" />
      </div>

      <!-- Остальной контент на странице -->
      <div class="content" v-observe-header="onChangeHeader">
        <!-- Заголовок -->
        <h1 class="title" v-if="props.title">{{ props.title }}</h1>

        <!-- Слот шаблона -->
        <slot />
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { TNav } from '~/utils/types/base';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  title?: string;
  nav?: TNav[];
}>();

/**
 * Переменные ----------------
 */
const route = useRoute();
const refHeader = ref<HTMLDivElement | null>(null);

/**
 * Вычисляемое ----------------
 */
// Показывать элементы управления
const isShowControls = computed(() => {
  return route.path.includes('sections') || route.path.includes('articles');
});

/**
 * Методы ----------------
 */
// Поменять стили у header при скролле
const onChangeHeader = (value: boolean) => {
  if (value) {
    refHeader.value?.classList.add('scrolled');
  } else {
    refHeader.value?.classList.remove('scrolled');
  }
};
</script>

<style lang="scss" scoped>
main {
  position: relative;
  background-color: $white;
  display: flex;
}

.content__wrapper {
  position: relative;
  width: 100%;
  &.nonav {
    .content {
      padding-top: 50px;
    }
  }
}

.content {
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 110px 50px 50px;
  overflow: auto;
}

.title {
  font-size: 24px;
  margin-bottom: 40px;
}

.header {
  width: 100%;
  border-bottom: 1px solid rgba($blue, 0.1);
  position: absolute;
  background-color: $white;
  z-index: 150;
  padding: 18px 50px;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.2s;
  &.scrolled {
    box-shadow: 0 0 10px rgba($blue, 0.3);
  }
}

.nav {
  display: flex;
  align-items: center;
  .nav__item {
    padding-right: 10px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    a {
      color: $black;
      &:hover {
        color: $blue;
        text-decoration: none;
      }
      &.router-link-active {
        color: $blue;
      }
    }
    &:last-child {
      i {
        display: none;
      }
    }
  }
  i {
    font-size: 15px;
    margin-left: 15px;
    margin-bottom: 3px;
    color: rgba($black, 0.5);
  }
}
</style>
