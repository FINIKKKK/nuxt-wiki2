<template>
  <main>
    <!-- Сайдбар -->
    <Sidebar />

    <!-- Остальной контент на странице -->
    <div id="scroll" class="content">
      <!-- Навигация -->
      <nav class="nav" v-if="props.nav">
        <template v-for="item in nav">
          <NuxtLink :to="item.link" v-if="item?.label">{{ item.label }}</NuxtLink>
        </template>
      </nav>

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
  padding: 46px 36px;
  overflow: auto;
}

.title {
  font-size: 24px;
  margin-bottom: 60px;
}

.nav {
  margin-bottom: 35px;
  a {
    color: $gray;
    font-size: 14px;
    &:hover {
      color: $blue;
    }
    &:not(:last-child) {
      position: relative;
      padding-right: 15px;
      margin-right: 10px;
      &::after {
        color: $gray;
        content: '/';
        position: absolute;
        right: 0px;
      }
    }
  }
}
</style>
