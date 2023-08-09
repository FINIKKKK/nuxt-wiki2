<template>
  <NuxtLayout name="main" :title="$t.create.title">
    <form class="form" @submit.prevent="onTopUpBalance">
      <UIInput
        :label="$t.create.input"
        v-model="amountValue"
        :errors="errors['amount']"
        type="number"
      />
      <button class="btn">{{ $t?.create.btn }}</button>
    </form>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useFormValidation } from '~/hooks/useFormValidation';
import { useTeamStore } from '~/stores/TeamContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { InvoiceScheme } from '~/utils/validation';

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
const { errors, validateForm } = useFormValidation();
const teamController = useTeamStore();
const amountValue = ref('');

/**
 * Методы ----------------
 */
// Пополнить баланс
const onTopUpBalance = async () => {
  // Данные
  const dto = {
    team_id: teamController.activeTeamId,
    amount: amountValue.value,
  };

  // Валидируем данные
  const isValid = await validateForm(dto, InvoiceScheme);
  if (!isValid) return false;

  // Пополнить баланс
  const { data } = await useCustomFetch(`billing/invoices/create`, {
    body: dto,
    method: 'POST',
  });
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
