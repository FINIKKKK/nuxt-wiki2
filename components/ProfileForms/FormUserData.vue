<template>
  <form class="form" @submit.prevent="onChangeUserData">
    <h2 class="title">Личные данные</h2>
    <div class="content">
      <Input
        label="Имя"
        v-model="firstNameValue"
        :errors="errorsValidate['firstName'] || []"
      />
      <Input
        label="Фамилия"
        v-model="lastNameValue"
        :errors="errorsValidate['lastName'] || []"
      />
      <Input
        label="Email"
        v-model="emailValue"
        :errors="errorsValidate['email'] || []"
      />
    </div>
    <button class="btn" :class="{ disabled: isLoading }">Сохранить</button>
  </form>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import Input from '~/components/UI/Input.vue';
import { useFormValidation } from '~/hooks/useFormValidation';
import { UserDataScheme } from '~/utils/validation';
import { Api } from '~/api';
import { useUserStore } from '~/stores/UserController';

/**
 * События ----------------
 */
const emits = defineEmits(['showWarningErrors', 'showWarningMessages']);

/**
 * Системные переменные ----------------
 */
const userStore = useUserStore(); // Хранилище пользователя

/**
 * Пользовательские переменные ----------------
 */
const firstNameValue = ref(userStore.user?.first_name); // Значене имени
const lastNameValue = ref(userStore.user?.last_name); // Значене фамилии
const emailValue = ref(userStore.user?.email); // Значене email

/**
 * Хуки ----------------
 */
// Для обработки формы
const { errorsValidate, errors, isLoading, validateForm } = useFormValidation();

/**
 * Отслеживание переменных ----------------
 */
// Следить за errors
watch(errors, () => {
  // Показать warning c ошибками
  emits('showWarningErrors', errors.value);
});

/**
 * Методы ----------------
 */
// Изменить данные пользователя
const onChangeUserData = async () => {
  // Убираем warning
  emits('showWarningErrors', []);
  emits('showWarningMessages', '');
  // Данные объекта
  const dto = {
    first_name: firstNameValue.value,
    last_name: lastNameValue.value,
    email: emailValue.value,
  };
  // Вызываем хук для валидации формы
  await validateForm(dto, UserDataScheme, async () => {
    // Обновляем данные пользователя
    await Api().account.edit(dto);
    // Обновляем данные в хранилище
    userStore.updateUserData(dto);
    // Отображаем сообщение об успешном изменении
    emits('showWarningMessages', 'Данные успешно изменены');
  });
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
