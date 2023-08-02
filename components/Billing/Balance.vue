<template>
  <div class="billing" tabindex="1" @blur="isOpenPopup = false">
    <!-- Баланс -->
    <div class="balance" @click="isOpenPopup = !isOpenPopup">
      <i class="fa-regular fa-tenge" />
      <p>{{ userController.billing?.balance }}</p>
      <i class="fa-regular fa-caret-down" :class="{ active: isOpenPopup }" />
    </div>

    <!-- Попап -->
    <ul class="popup" v-if="isOpenPopup">
      <li>
        <NuxtLink :to="`${teamController.activeTeamSlug}/billing/top_up`">
          Пополнить
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useUserStore } from '~/stores/UserController';

/**
 * Переменные ----------------
 */
const teamController = useTeamStore();
const userController = useUserStore();
const isOpenPopup = ref(false);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.balance {
  display: flex;
  align-items: center;
  cursor: pointer;
  p {
    margin: 0 15px;
    line-height: 15px;
  }
  .fa-caret-down.active {
    transform: rotate(180deg);
  }
}

.popup {
  top: 50px;
  right: 20px;
}
</style>
