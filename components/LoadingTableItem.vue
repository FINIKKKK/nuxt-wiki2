<template>
  <tr class="item">
    <th v-for="(item, index) in Array(props.count)" :key="index">
      <p class="loading">0</p>
    </th>
  </tr>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
/**
 * Пропсы ----------------
 */
const props = defineProps<{
  count: number;
}>();
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.item {
  height: 64px;
  font-size: 0;
  th {
    padding: 20px 16px;
  }
}
</style>
