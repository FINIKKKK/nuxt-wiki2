<template>
  <NuxtLayout name="main" title="Добавление пользователей">
    <!-- Ошибки -->
    <UIWarning
      class="warning"
      :errors="requestController.errors[url]"
      v-if="requestController.errors[url]"
    />

    <!-- Форма -->
    <form class="form" @submit.prevent="onInviteUsers">
      <UIInput
        label="Введите email адреса через запятую или пробел"
        v-model="emailUsers"
        class-name="label"
        :errors="errors['emails']"
      />
      <UISelect
        :options="roles"
        v-model="selectValue"
        type="full"
        class="select"
      />
      <button class="btn" :class="requestController.loading[url]">
        Выслать приглашение
      </button>
    </form>
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
import { AddUsersScheme } from '~/utils/validation';

const url = 'team/employees/add';
const emailUsers = ref('');
const selectValue = ref(roles[0]);
const teamController = useTeamStore();
const requestController = useRequestStore();

const { errors, validateForm } = useFormValidation(); // Для валидации формы

const onInviteUsers = async () => {
  // Данные запроса
  const dto = {
    team_id: teamController.activeTeamId,
    role: selectValue.value.value,
    emails: emailUsers.value,
  };

  // Валидируем данные
  const isValid = await validateForm(dto, AddUsersScheme);
  if (!isValid) return false;

  const { data } = await useCustomFetch(url, {
    body: dto,
    method: 'POST',
  });
  console.log(data);
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.form {
  width: 529px;
}

.select {
  margin-bottom: 32px;
}

.warning {
  margin: 0px -50px 50px;
}
</style>
