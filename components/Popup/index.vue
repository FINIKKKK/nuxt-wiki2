<template>
  <div
    class="aside-popup__wrapper"
    :class="{ active: props.isOpen }"
    @click.self="emits('close')"
  ></div>
  <div class="aside-popup" :class="{ active: props.isOpen }">
    <h3 class="title">{{ props.title }}</h3>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
/**
 * Пропсы ----------------
 */
const props = defineProps<{
  isOpen: boolean;
  title: string;
}>();

/**
 * События ----------------
 */
const emits = defineEmits(['close']);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.aside-popup {
  position: fixed;
  right: 0;
  top: 0;
  background-color: $white;
  padding: 50px 0;
  min-height: 100vh;
  overflow: auto;
  width: 500px;
  z-index: 300;
  box-shadow: 0 0 10px rgba($blue, 0.3);
  transform: translateX(110%);
  transition: 0.3s;
  &.active {
    transform: translateX(0);
  }
  .title {
    font-size: 24px;
    padding: 0 32px 24px;
    margin-bottom: 16px;
    border-bottom: 1px solid $blue3;
  }
  .content {
    padding: 15px 32px;
  }
}

.aside-popup__wrapper {
  background-color: rgba(241, 246, 253, 0.85);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 200;
  opacity: 0;
  transition: 0.3s;
  pointer-events: none;
  &.active {
    opacity: 1;
    pointer-events: visible;
  }
}
</style>

<style>
.aside-popup {
  .text {
    margin-bottom: 20px;
  }
}
</style>
