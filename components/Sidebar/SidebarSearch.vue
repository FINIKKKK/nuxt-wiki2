<template>
  <Input
    v-if="props.activeItem === 'search'"
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

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  activeItem: string | null;
}>();

/**
 * Системные переменные ----------------
 */

/**
 * Пользовательские переменные ----------------
 */
const searchValue = ref(''); // Значение поиска
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
