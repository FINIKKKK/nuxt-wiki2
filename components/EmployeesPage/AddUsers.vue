<template>
  <UIAsidePopup
    title="Change access level"
    :isOpen="props.active"
    @close="employeesController.closeAddUsers()"
  >
    <p class="text">
      There are several access levels for user interaction with the itl.wiki
      workspace.
    </p>
    <UIInput
      label="Enter user e-mail addresses separated by commas"
      v-model="emailValue"
      :errors="errors['emails']"
      @keydown.enter="() => onAddEmail(emailValue)"
      @input="onSplitAddEmail"
    />

    <!-- Список emails -->
    <ul class="emails" v-if="emails.length">
      <li class="email" v-for="(email, index) in emails" :key="index">
        <p>{{ email }}</p>
        <i class="fa-regular fa-close" @click="() => onRemoveEmail(email)" />
      </li>
    </ul>

    <button
      class="btn"
      @click="onAddUsers"
      :class="{ disabled: requestController.loading[url] }"
    >
      Add
    </button>
  </UIAsidePopup>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useEmployeesStore } from '~/stores/EmployeesController';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { useFormValidation } from '~/hooks/useFormValidation';
import { AddUsersScheme, AddUsersScheme2 } from '~/utils/validation';
import {useRequestStore} from "~/stores/RequestController";

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  active: boolean;
}>();

/**
 * Переменные ----------------
 */
const employeesController = useEmployeesStore();
const teamController = useTeamStore();
const emailValue = ref('');
const emails = ref([]);
const requestController = useRequestStore();
const { errors, validateForm } = useFormValidation();
const url = 'team/employees/add';

/**
 * Методы ----------------
 */

// Добавить email в список
const onAddEmail = async (email: string) => {
  // Валидируем данные
  const isValid = await validateForm(
    { emails: emailValue.value },
    AddUsersScheme2,
  );
  if (!isValid) return false;

  if (!emails.value.find((obj) => obj === email)) {
    // Добавить email
    emails.value.push(email.trim());
  }
  emailValue.value = '';
};

// Добавить email в список через запятую
const onSplitAddEmail = (e) => {
  if (e.target.value.includes(',')) {
    onAddEmail(emailValue.value.split(',')[0]);
  }
};

// Удалить email из списка
const onRemoveEmail = (email: string) => {
  emails.value = emails.value.filter((obj) => obj !== email);
};

// Добавить пользователей
const onAddUsers = async () => {
  // Данные запроса
  const dto = {
    team_id: teamController.activeTeamId,
    role: 'user',
    emails: emails.value,
  };

  // Валидируем данные
  const isValid = await validateForm({ emails: emails.value }, AddUsersScheme);
  if (!isValid) return false;

  // Высылаем приглашения
  const { message } = await useCustomFetch(url, {
    body: dto,
    method: 'POST',
  });

  if (message) {
    employeesController.closeRoles();
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.emails {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 12px;
  .email {
    &:not(:last-child) {
      margin-right: 20px;
    }
    background-color: $blue2;
    display: flex;
    align-items: center;
    border-radius: 2px;
    padding: 10px 15px;
    margin-bottom: 20px;
    p {
      color: $blue;
      margin-right: 10px;
    }
    i {
      width: 17px;
      height: 17px;
      cursor: pointer;
    }
  }
}
</style>
