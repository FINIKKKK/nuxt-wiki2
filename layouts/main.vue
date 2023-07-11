<template>
  <main>
    <!-- Сайдбар -->
    <Sidebar />

    <!-- Остальной контент на странице -->
    <div id="scroll" class="content" ref="refContent">
      <!-- Навигация -->
      <div class="header" v-if="props.nav" :class="{ scrolled: isScrolled }">
        <nav class="nav">
          <template v-for="item in nav">
            <div class="nav__item" v-if="item?.label">
              <NuxtLink :to="item.link">{{ item.label }}</NuxtLink>
              <svg-icon name="arrow" />
            </div>
          </template>
        </nav>

        <ElemPageControls
          v-if="
            route.path.includes('sections') || route.path.includes('articles')
          "
        />
      </div>

      <!-- Заголовок -->
      <h1 class="title" v-if="props.title">{{ props.title }}</h1>

      <!-- Слот шаблона -->
      <slot />
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
const refContent = ref(null);
const isScrolled = ref(false);

/**
 * Вычисляемые значения ----------------
 */
// Добавить стили при скролле
onMounted(() => {
  if (process.client) {
    const block = refContent.value;

    block.addEventListener('scroll', function () {
      if (block.scrollTop > 30) {
        isScrolled.value = true;
      } else {
        isScrolled.value = false;
      }
    });
  }
});
</script>

<style lang="scss" scoped>
main {
  position: relative;
  display: flex;
}

.content {
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 46px 50px;
  padding-top: 110px;
  overflow: auto;
}

.title {
  font-size: 24px;
  margin-bottom: 40px;
}

.header {
  width: calc(100% - 380px);
  border-bottom: 1px solid rgba($blue, 0.1);
  margin-bottom: 35px;
  position: fixed;
  background-color: $white;
  z-index: 150;
  margin: 0 -50px;
  padding: 24px 50px;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
      svg {
        display: none;
      }
    }
  }
  svg {
    width: 15px;
    height: 15px;
    margin-left: 15px;
    fill: $blue3;
  }
}
</style>
