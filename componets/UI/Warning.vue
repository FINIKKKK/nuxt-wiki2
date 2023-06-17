<template>
  <div class="errors" :class="{ success: props.messages }">
    <svg-icon name="warning" />
    <div class="items">
      <!-- Либо отображать ошибки -->
      <span v-if="!props.messages" v-for="error in props.errors">{{
        error
      }}</span>
      <!-- Либо отображать сообщение об успешном действии -->
      <span v-else>{{ props.messages }}</span>
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
  errors?: string[];
  messages?: string;
}>();
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.errors {
  background-color: rgba($red, 0.1);
  display: flex;
  align-items: center;
  padding: 21px 50px;
  margin: 0 -50px 35px;
  svg {
    width: 23px;
    height: 23px;
    margin-right: 16px;
    fill: $red;
  }
  .items span {
    display: block;
    color: $red;
    &:not(:last-child) {
      margin-bottom: 3px;
    }
  }
  &.success {
    background-color: rgba(#6dcaac, 0.5);
    svg {
      fill: #359173;
    }
    .items span {
      color: #359173;
    }
  }
}
</style>
