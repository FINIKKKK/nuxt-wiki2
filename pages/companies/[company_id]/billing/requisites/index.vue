<template>
  <NuxtLayout name="main" :nav="nav">
    <div class="requisites">
      <h3>{{ $t.table.requisites }}</h3>
      <table>
        <tbody>
          <tr>
            <th>{{ $t.table.name }}</th>
            <th>{{ requisitesController.requisites?.requisites.name }}</th>
          </tr>
          <tr>
            <th>{{ $t.table.bin }}</th>
            <th>{{ requisitesController.requisites?.requisites.BIN }}</th>
          </tr>
          <tr>
            <th>{{ $t.table.bik }}</th>
            <th>{{ requisitesController.requisites?.requisites.BIK }}</th>
          </tr>
          <tr>
            <th>{{ $t.table.account }}</th>
            <th>{{ requisitesController.requisites?.requisites.account }}</th>
          </tr>
          <tr>
            <th>{{ $t.table.address }}</th>
            <th>{{ requisitesController.requisites?.requisites.address }}</th>
          </tr>
          <tr>
            <th>{{ $t.table.person }}</th>
            <th>{{ userController.user?.fullname }}</th>
          </tr>
          <tr>
            <th>{{ $t.table.email }}</th>
            <th>{{ userController.user?.email }}</th>
          </tr>
          <tr>
            <th>{{ $t.table.phone }}</th>
            <th>{{ userController.user?.phone }}</th>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="requisites contact">
      <h3>{{ $t.table.contact }}</h3>
      <table>
        <tbody>
          <tr>
            <th>{{ $t.table.person }}</th>
            <th></th>
          </tr>
          <tr>
            <th>{{ $t.table.email }}</th>
            <th>{{ userController.user?.email }}</th>
          </tr>
          <tr>
            <th>{{ $t.table.phone }}</th>
            <th>{{ userController.user?.phone }}</th>
          </tr>
        </tbody>
      </table>
    </div>

    <NuxtLink
      class="btn"
      :to="`${teamController.activeTeamSlug}/billing/requisites/edit`"
    >
      {{ $t?.edit }}
    </NuxtLink>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useUserStore } from '~/stores/UserController';
import { useRequisitesStore } from '~/stores/RequisitesController';

/**
 * Мета ----------------
 */
definePageMeta({
  middleware: ['owner-access', 'requisites'],
});

/**
 * Переменные ----------------
 */
const $t = await useTranslate('requisites');
const teamController = useTeamStore();
const requisitesController = useRequisitesStore();
const userController = useUserStore();
const route = useRoute();
const nav = [
  { label: $t.nav.billing, link: `${teamController.activeTeamSlug}/billing` },
  {
    label: $t.title,
    link: route.fullPath,
  },
];
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.contact {
  margin-bottom: 40px !important;
}

.requisites {
  &:not(:last-child) {
    margin-bottom: 80px;
  }
  h3 {
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 24px;
  }
  table {
    text-align: left;
    th {
      padding: 0 75px 18px 0;
    }
    th:first-child {
      color: $gray;
    }
  }
}
</style>
