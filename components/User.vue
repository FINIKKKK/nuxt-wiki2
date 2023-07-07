<template>
  <li class="user" :data-layout="props.className">
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
  img {
    width: 35px;
    height: 35px;
    margin-right: 15px;
    border-radius: 50%;
  }
  &:hover {
    background-color: rgba($blue, 0.1);
  }
}

.user[data-layout='comment'] {
  img {
    width: 25px;
    height: 25px;
  }
  p {
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
