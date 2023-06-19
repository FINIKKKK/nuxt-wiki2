<template>
  <form class="form" @submit.prevent="onChangePassword">
    <h2 class="title">Безопасность</h2>
    <div class="content">
      <Input
        label="Текущий пароль"
        type="password"
        v-model="passwordValue"
        :errors="errorsValidate['password'] || []"
      />
      <Input
        label="Новый пароль"
        type="password"
        v-model="newPasswordValue"
        :errors="errorsValidate['new_password'] || []"
      />
      <Input
        label="Повторить пароль"
        type="password"
        v-model="passwordConfirmValue"
        :errors="errorsValidate['password_confirmation'] || []"
      />
    </div>
    <button class="btn" :class="{ disabled: isLoading }">Сохранить</button>
  </form>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { Api } from '~/api';
import { useFormValidation } from '~/hooks/useFormValidation';
import Input from '~/components/UI/Input.vue';
import { PasswordScheme } from '~/utils/validation';

/**
 * События ----------------
 */
const emits = defineEmits(['showWarningErrors', 'showWarningMessages']);

/**
 * Пользоватеьские переменные ----------------
 */
const passwordValue = ref(''); // Значение текущего пароля
const newPasswordValue = ref(''); // Значение нового пароля
const passwordConfirmValue = ref(''); // Значение подтвежденного пароля

/**
 * Хуки ----------------
 */
// Для обработки формы
const { errorsValidate, errors, isLoading, validateForm } = useFormValidation();

/**
 * Отслеживание переменных ----------------
 */
// Следить за значением ошибок
watch(errors, () => {
  // Показать warning c ошибками
  emits('showWarningErrors', errors.value);
});

/**
 * Методы ----------------
 */
// Изменение пароля пользователя
const onChangePassword = async () => {
  // Убираем warning
  emits('showWarningErrors', []);
  emits('showWarningMessages', '');
  // Объект с данными
  const dto = {
    password: passwordValue.value,
    new_password: newPasswordValue.value,
    password_confirmation: passwordConfirmValue.value,
  };
  // Вызываем хук для валидации формы÷
  await validateForm(dto, PasswordScheme, async () => {
    // Обновляем пароль
    await Api().account.password(dto);
    // Отображаем сообщение об успешном изменении
    emits('showWarningMessages', 'Пароль успешно изменен');
    // Перемещаем пользователя на вверх
    const block = document.getElementById('scroll');
    if (block && typeof block.scrollTo === 'function') {
      block.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  // Если, есть ошибки при отправке формы, то перемещаем пользователя на вверх
  if (errors.value.length) {
    const block = document.getElementById('scroll');
    if (block && typeof block.scrollTo === 'function') {
      block.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.form {
  margin-top: 75px;
}
</style>
