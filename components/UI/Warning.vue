<template>
  <div class="errors" :class="{ success: props.message }">
    <i class="fa-regular fa-exclamation-triangle" />
    <div class="items">
      <!-- Либо отображать ошибки -->
      <span v-if="!props.message" v-for="error in props.errors">{{
        error
      }}</span>
      <!-- Либо отображать сообщение об успешном действии -->
      <span v-else>{{ props.message }}</span>
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
  message?: string;
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
  margin: 0 -36px 35px;
  i {
    width: 23px;
    height: 23px;
    font-size: 22px;
    margin-right: 16px;
    color: $red;
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
    i {
      color: #359173;
    }
    .items span {
      color: #359173;
    }
  }
}
</style>
