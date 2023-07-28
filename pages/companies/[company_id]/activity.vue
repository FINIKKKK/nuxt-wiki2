<template>
  <NuxtLayout name="main" :title="$t.home.activity" :nav="nav">
    <button class="btn" @click="onClick">Click</button>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';

/**
 * Переменные ----------------
 */
const route = useRoute();
const $t = await useTranslate('sidebar');
const nav = [{ label: $t.home.activity, link: route.path }];
const teamController = useTeamStore();

const dto = {
  team_id: teamController.activeTeamId,
  group_id: 1,
};

const { data } = await useCustomFetch(`billing`, {
  query: dto,
});
console.log('data', data);

const onClick = async () => {
  // Данные
  const dto2 = {
    team_id: teamController.activeTeamId,
    amount: 1000,
    name: 'itl',
    BIN: '454',
    BIK: '455',
    account: 'dsfsd',
    address: 'fdsfsd',
    invoice_id: 1,
    email: 'krashmate@gmail.com'
  };

  const { data } = await useCustomFetch(`billing/invoices/send`, {
    body: dto2,
    method: 'POST',
  });
  console.log('data-click', data);
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
