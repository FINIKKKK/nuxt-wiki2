<template>
  <div class="avatar" v-if="props.data?.picture.includes('user.jpg')">
    {{ `${props.data.first_name[0]}${props.data.last_name[0]}` }}
  </div>
  <img :src="props.data?.picture" alt="avatar" v-else />
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { TUser } from '~/utils/types/account';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  data: TUser | null;
}>();
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
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
