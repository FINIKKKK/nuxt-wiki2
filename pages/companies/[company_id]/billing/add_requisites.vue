<template>
  <NuxtLayout name="main" :nav="nav" :title="$t.add">
    <form @submit.prevent="onAddRequisites" class="form">
      <UIInput
        :label="$t.table.name"
        v-model="inputName"
        :errors="errors['name']"
      />
      <UIInput
        :label="$t.table.bin"
        v-model="inputBIN"
        :errors="errors['BIN']"
        @input="inputBIN = inputBIN.toUpperCase()"
      />
      <UIInput
        :label="$t.table.bik"
        v-model="inputBIK"
        :errors="errors['BIK']"
        @input="inputBIK = inputBIK.toUpperCase()"
      />
      <UIInput
        :label="$t.table.account"
        v-model="inputAccount"
        :errors="errors['account']"
        @input="inputAccount = inputAccount.toUpperCase()"
      />
      <UIInput
        :label="$t.table.address"
        v-model="inputAddress"
        :errors="errors['address']"
      />
      <button class="btn">{{ $t?.btn }}</button>
    </form>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useFormValidation } from '~/hooks/useFormValidation';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { RequisiteSchema } from '~/utils/validation';

/**
 * Мета ----------------
 */
definePageMeta({
  middleware: 'owner-access',
});

/**
 * Переменные ----------------
 */
const $t = await useTranslate('requisites');
const teamController = useTeamStore();
const route = useRoute();
const nav = [
  { label: $t.nav.billing, link: `${teamController.activeTeamSlug}/billing` },
  {
    label: $t.title,
    link: `${teamController.activeTeamSlug}/billing/requisites`,
  },
  {
    label: $t.add,
    link: route.fullPath,
  },
];
const { errors, validateForm } = useFormValidation();
const router = useRouter();
const inputName = ref('');
const inputBIN = ref('');
const inputBIK = ref('');
const inputAccount = ref('');
const inputAddress = ref('');

/**
 * Методы ----------------
 */
// Добавить реквизиты
const onAddRequisites = async () => {
  // Данные
  const dto = {
    team_id: teamController.activeTeamId,
    name: inputName.value,
    BIN: inputBIN.value,
    BIK: inputBIK.value,
    account: inputAccount.value,
    address: inputAddress.value,
  };

  // Валидируем данные
  const isValid = await validateForm(dto, RequisiteSchema);
  if (!isValid) return false;

  // Добавить реквизиты
  const { data } = await useCustomFetch(`billing/requisites/add`, {
    body: dto,
    method: 'POST',
  });

  if (data) {
    await router.push(`${teamController.activeTeamSlug}/billing/requisites`);
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
