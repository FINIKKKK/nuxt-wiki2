<template>
  <Input
    class="input"
    label="Искать статью, раздел или пользователя"
    v-model="searchValue"
    :errors="[]"
  />
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import Input from '~/components/UI/Input.vue';
import { useSidebarStore } from '~/stores/SidebarController';

/**
 * Системные переменные ----------------
 */
const sidebarController = useSidebarStore(); // Хранилище сайдбара

/**
 * Пользовательские переменные ----------------
 */
const searchValue = ref(''); // Значение поиска
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
