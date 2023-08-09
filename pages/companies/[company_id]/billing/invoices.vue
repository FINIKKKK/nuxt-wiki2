<template>
  <NuxtLayout name="main" :nav="nav" :title="$t.title">
    <!--------------------------------------
     Табдица
    ---------------------------------------->
    <table class="table" v-if="invoicesList.length">
      <thead>
        <tr>
          <th>{{ $t.table.id }}</th>
          <th>{{ $t.table.amount }}</th>
          <th>{{ $t.table.type }}</th>
          <th>{{ $t.table?.date }}</th>
          <th>{{ $t.table.status }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="invoice in invoicesList" class="notice" :key="invoice.id">
          <th>{{ invoice.id }}</th>
          <th>{{ invoice.amount }}</th>
          <th>{{ useFormatDate(invoice.created_at, userController.lang) }}</th>
          <th>{{ invoice.type }}</th>
          <th>{{ invoice.status }}</th>
        </tr>
      </tbody>
    </table>

    <!-- Сообщение, если нету элементов -->
    <p v-else>{{ $t?.no_invoices }}</p>

    <!-- Loading -->
    <LoadingTableItem
      v-if="requestController.loading[url]"
      v-for="(item, index) in Array(10)"
      :key="index"
      :count="5"
    />

    <div v-observe="() => getMoreData()"></div>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useFormatDate } from '~/hooks/useFormatData';
import { useRequestStore } from '~/stores/RequestController';
import { useUserStore } from '~/stores/UserController';
import { TInvoice } from '~/utils/types/billing';

/**
 * Мета ----------------
 */
definePageMeta({
  middleware: 'owner-access',
});

/**
 * Переменные ----------------
 */
const $t = await useTranslate('invoices');
const teamController = useTeamStore();
const route = useRoute();
const nav = [
  { label: $t.nav.billing, link: `${teamController.activeTeamSlug}/billing` },
  {
    label: $t.title,
    link: route.fullPath,
  },
];
const requestController = useRequestStore();
const invoicesList = ref<TInvoice[]>([]);
const url = 'billing/invoices';
const userController = useUserStore();

/**
 * Получение данных ----------------
 */
// Получение счетов
const { data: invoices } = await useCustomFetch<TInvoice[]>(url, {
  query: { team_id: teamController.activeTeamId },
});
invoicesList.value = invoices;

/**
 * Методы ----------------
 */
// Получение новых данных
let isEnd = true;  // Поствать на false, чтобы работало
const getMoreData = async () => {
  if (!isEnd) {
    const { data: newInvoices } = await useCustomFetch<TInvoice[]>(url, {
      query: {
        team_id: teamController.activeTeamId,
        limit: 15,
        offset: invoicesList.value.length,
      },
    });

    if (!newInvoices.length) {
      isEnd = true;
    }
    invoicesList.value = [...invoicesList.value, ...newInvoices];
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
