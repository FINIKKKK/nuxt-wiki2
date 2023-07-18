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

.loading {
  background: #e5e5e5;
  position: relative;
  &::before {
    position: absolute;
    content: '';
    background: #c6c6c6;
    width: 100%;
    height: 100%;
    animation: skeleton 3s ease-in-out infinite;
  }
}

@keyframes skeleton {
  0% {
    transform: scaleX(0);
    transform-origin: left;
    opacity: 0.3;
  }
  20% {
    transform: scaleX(1);
    transform-origin: left;
    opacity: 1;
  }
  28% {
    transform: scaleX(1);
    transform-origin: right;
  }
  51% {
    transform: scaleX(0);
    transform-origin: right;
  }
  58% {
    transform: scaleX(0);
    transform-origin: right;
  }
  82% {
    transform: scaleX(1);
    transform-origin: right;
  }
  83% {
    transform: scaleX(1);
    transform-origin: left;
  }
  96% {
    transform: scaleX(0);
    transform-origin: left;
  }
  to {
    transform: scaleX(0);
    transform-origin: left;
    opacity: 0.3;
  }
}
</style>
