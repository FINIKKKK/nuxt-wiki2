<template>
  <Popup
    :title="$t.addUsers.title"
    :isOpen="props.isOpen"
    @close="emits('close')"
  >
    <p class="text">{{ $t.addUsers.text }}</p>
    <UIInput
      :label="$t.addUsers.input"
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
      {{ $t.addUsers.btn }}
    </button>
  </Popup>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useEmployeesStore } from '~/stores/EmployeesController';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { useFormValidation } from '~/hooks/useFormValidation';
import { AddUsersScheme, AddUsersScheme2 } from '~/utils/validation';
import { useRequestStore } from '~/stores/RequestController';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  isOpen: boolean;
}>();

/**
 * События ----------------
 */
const emits = defineEmits(['close']);

/**
 * Переменные ----------------
 */
const url = 'team/employees/add';
const employeesController = useEmployeesStore();
const teamController = useTeamStore();
const requestController = useRequestStore();
const emailValue = ref('');
const emails = ref<string[]>([]);
const { errors, validateForm } = useFormValidation();
const $t = await useTranslate('employees');

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
const onSplitAddEmail = (e: any) => {
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
    employeesController.closeAddUsers();
    emails.value = [];
    emailValue.value = '';
    errors.value = [] as any;
    employeesController.setSuccessMessage($t.addUsers.successMessage);
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
