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
    <button class="btn" :class="{ disabled: isLoading }">
      Сохранить
    </button>
  </form>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import Input from '~/componets/UI/Input.vue';
import { useFormValidation } from '~/hooks/useFormValidation';
import { UserDataScheme } from '~/utils/validation';
import { Api } from '~/api';
import { useUserStore } from '~/stores/UserStore';

/**
 * События ----------------
 */
const emits = defineEmits(['showWarning', 'showWarningSuccess']);

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
  emits('showWarning', errors.value);
});

/**
 * Методы ----------------
 */
// Изменить данные пользователя
const onChangeUserData = async () => {
  // Убираем warning
  emits('showWarning', []);
  emits('showWarningSuccess', '');
  // Данные объекта
  const dto = {
    first_name: firstNameValue.value,
    last_name: lastNameValue.value,
    email: emailValue.value,
  };
  // Вызываем хук для валидации формы
  await validateForm(dto, UserDataScheme, async () => {
    // Обновляем данные пользователя
    const { data } = await Api().account.edit(dto);
    // Обновляем в хранилище
    userStore.setUser(data);
    // Отображаем сообщение об успешном изменении
    emits('showWarningSuccess', 'Данные успешно изменены');
  });
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
