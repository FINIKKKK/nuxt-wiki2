<template>
  <li class="user" :data-layout="props.className">
    <Avatar :data="props.data" />
    <p>{{ props.data.fullname }}</p>
  </li>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { TUser } from '~/utils/types/account';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  data: TUser;
  className?: 'comment';
}>();
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.user {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px;
  &:hover {
    background-color: rgba($blue, 0.1);
  }
}
</style>

<style>
.user {
  img {
    width: 35px;
    height: 35px;
    margin-right: 15px;
    border-radius: 50%;
  }
}
</style>
