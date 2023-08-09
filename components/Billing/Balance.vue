<template>
  <div class="billing" ref="refPopup">
    <!-- Баланс -->
    <div class="balance" @click="isOpenPopup = !isOpenPopup">
      <i class="fa-regular fa-tenge" />
      <p>{{ $t?.balance }} {{ userController.billing?.balance }} ₸</p>
      <i class="fa-regular fa-caret-down" :class="{ active: isOpenPopup }" />
    </div>

    <!-- Попап -->
    <ul class="popup" v-if="isOpenPopup">
      <li>
        <NuxtLink :to="`${teamController.activeTeamSlug}/billing/top_up`">
          <i class="fa-regular fa-add" />
          <p>{{ $t?.top_up }}</p>
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
import { useOutsideClick } from '~/hooks/useOutsideClick';

/**
 * Переменные ----------------
 */
const teamController = useTeamStore();
const userController = useUserStore();
const isOpenPopup = ref(false);
const $t = await useTranslate('billing');
const refPopup = ref(null);

/**
 * Хуки ----------------
 */
useOutsideClick(refPopup, isOpenPopup);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.balance {
  user-select: none;
  height: 100%;
  border-left: 1px solid rgba($blue, 0.1);
  margin: -18px 0;
  padding: 18px 0px 18px 18px;
  display: flex;
  align-items: center;
  cursor: pointer;
  p {
    margin: 0 15px;
    line-height: 15px;
    margin-bottom: -2px;
  }
  .fa-caret-down {
    color: $black;
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
