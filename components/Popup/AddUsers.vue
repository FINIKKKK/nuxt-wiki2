<template>
  <Popup
    :title="$t.addUsers.title"
    :isOpen="props.isOpen"
    @close="emits('close')"
  >
    <p class="text">{{ $t?.addUsers.text }}</p>

    <!-- Поле ввода с разделением элементов -->
    <UIInputSplit
      :label="$t.addUsers.input"
      :scheme="AddUsersScheme2"
      v-model="emails"
      :errors="errors['emails']"
    />

    <button
      class="btn"
      @click="onAddUsers"
      :class="{ disabled: requestController.loading[url] }"
    >
      {{ $t?.addUsers.btn }}
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
const emails = ref<string[]>([]);
const { errors, validateForm } = useFormValidation();
const $t = await useTranslate('employees');

/**
 * Методы ----------------
 */
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
    window.location.reload()
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
