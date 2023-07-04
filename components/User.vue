<template>
  <li class="user">
    <img :src="props.data.picture" alt="avatar" />
    <p>{{ props.data?.fullname }}</p>
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
  img {
    width: 40px;
    height: 40px;
    margin-right: 25px;
  }
  &:hover {
    background-color: rgba($blue, 0.1);
  }
}
</style>
