<template>
  <NuxtLayout name="main" :title="$t.title">
    <!-- Ошибки -->
    <UIWarning
      class="warning-m"
      :errors="requestController.errors[url]"
      v-if="requestController.errors[url]"
    />

    <!-- Форма -->
    <div class="form">
      <p class="text">
        {{ $t.text }}
      </p>

      <!-- Поле ввода с разделением элементов -->
      <UIInputSplit
        :label="$t.input"
        :scheme="AddUsersScheme2"
        v-model="emails"
        :errors="errors['emails']"
      >
        <template #btn> {{ $t.inputBtn }}</template>
      </UIInputSplit>

      <!-- Селект -->
      <UISelect
        :options="rolesList"
        v-model="selectValue"
        type="full"
        class="select"
        :label="$t.select"
      />

      <p class="small">
        {{ $t.smallText1 }}
        <a href="#">{{ $t.smallLink1 }}</a
        >{{ $t.smallText2 }}
        <a href="#">{{ $t.smallLink2 }}</a>
      </p>
    </div>

    <button
      class="btn"
      :class="{ disabled: requestController.loading[url] }"
      @click="onInviteUsers"
    >
      {{ $t.btn }}
    </button>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { roles } from '~/utils/data';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { useRequestStore } from '~/stores/RequestController';
import { useFormValidation } from '~/hooks/useFormValidation';
import { AddUsersScheme, AddUsersScheme2 } from '~/utils/validation';

/**
 * Переменные ----------------
 */
const $t2 = await useTranslate('data');
const rolesList = roles.map((role) => ({
  value: role.value,
  label: $t2.roles[role.label],
}));
const url = 'team/employees/add';
const selectValue = ref(rolesList[0]);
const teamController = useTeamStore();
const requestController = useRequestStore();
const emails = ref<string[]>([]);
const router = useRouter();
const $t = await useTranslate('add_users');
const { errors, validateForm } = useFormValidation();

/**
 * Методы ----------------
 */
// Приглагшаем пользователей
const onInviteUsers = async () => {
  // Данные
  const dto = {
    team_id: teamController.activeTeamId,
    role: selectValue.value.value,
    emails: emails.value,
  };

  // Валидируем данные
  const isValid = await validateForm({ emails: emails.value }, AddUsersScheme);
  if (!isValid) return false;

  // Высылаем приглашения
  const { data } = await useCustomFetch(url, {
    body: dto,
    method: 'POST',
  });
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>

<style lang="scss">
.email1 {
  input {
    padding-right: 150px;
  }
}

.email2 {
  input {
    padding-right: 150px;
  }
}
</style>
