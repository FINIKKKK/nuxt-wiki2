<template>
  <div class="item"></div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup></script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.item {
  position: relative;
  background-color: $blue3;
  width: 100%;
  height: 54px;
  border-radius: 3px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.11);
  overflow: hidden !important;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  &:first-child {
    margin-top: 10px;
  }
  &::after {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-200%);
    background: linear-gradient(
      90deg,
      transparent,
      rgba($blue, 0.15),
      transparent
    );
    animation: loading 2s infinite;
  }
  @keyframes loading {
    100% {
      transform: translateX(200%);
    }
  }
}
</style>
