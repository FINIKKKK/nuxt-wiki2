<template>
  <li class="user" :data-layout="props.className">
    <div
      class="avatar"
      v-if="
        props.data.picture ===
        'https://api.wiki.itl.systems/assets/img/user.jpg'
      "
    >
      {{ `${props.data.first_name[0]}${props.data.last_name[0]}` }}
    </div>
    <img :src="props.data.picture" alt="avatar" v-else />
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

.avatar {
  text-transform: uppercase;
  font-size: 14px;
  background-color: $bg;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  color: $blue;
  border: 1px solid $blue;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}
</style>
