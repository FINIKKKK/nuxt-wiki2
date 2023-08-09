<template>
  <NuxtLayout
    name="main"
    :nav="nav"
    :title="props.type === 'edit' ? $t.edit : $t.add"
  >
    <form @submit.prevent="onAddOrEdit" class="form">
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
      <button class="btn">
        {{ props.type === 'edit' ? $t?.btn2 : $t?.btn }}
      </button>
    </form>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useFormValidation } from '~/hooks/useFormValidation';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { RequisiteScheme } from '~/utils/validation';
import { useRequisitesStore } from '~/stores/RequisitesController';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  type?: 'edit' | 'add';
}>();

/**
 * Переменные ----------------
 */
const $t = await useTranslate('requisites');
const teamController = useTeamStore();
const requisitesController = useRequisitesStore();

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
 * Получение данных ----------------
 */
if (props.type === 'edit') {
  inputName.value = requisitesController.requisites?.requisites.name || '';
  inputBIN.value = requisitesController.requisites?.requisites.BIN || '';
  inputBIK.value = requisitesController.requisites?.requisites.BIK || '';
  inputAccount.value = requisitesController.requisites?.requisites.account || '';
  inputAddress.value = requisitesController.requisites?.requisites.address || '';
}

/**
 * Методы ----------------
 */
// Добавить или изменить реквизиты
const onAddOrEdit = async () => {
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
  const isValid = await validateForm(dto, RequisiteScheme);
  if (!isValid) return false;

  // Добавить или изменить реквизиты
  const { data, message } = await useCustomFetch(
    `billing/requisites/${props.type === 'edit' ? 'edit' : 'add'}`,
    {
      body: dto,
      method: 'POST',
    },
  );

  if (data || message) {
    await router.push(`${teamController.activeTeamSlug}/billing/requisites`);
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
