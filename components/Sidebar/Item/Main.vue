<template>
  <li class="sidebar__item">
    <NuxtLink v-if="props.data.link" :to="props.data.link">
      <svg-icon :name="props.data.icon" />
      <p>{{ props.data.label }}</p>
    </NuxtLink>
    <a v-else @click="props.data.method">
      <svg-icon v-if="props.data.method" :name="props.data.icon" />
      <p>{{ props.data.label }}</p>
    </a>
  </li>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { TItem } from '~/utils/types/sidebar';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  data: TItem;
}>();
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
