<template>
  <form class="form" @submit.prevent="onChangePassword">
    <h2 class="title">{{ $t.passwords.title }}</h2>
    <UIInput
      :label="$t.passwords.inputPassword"
      type="password"
      v-model="passwordValue"
      :errors="errors['password']"
    />
    <UIInput
      :label="$t.passwords.inputPasswordNew"
      type="password"
      v-model="newPasswordValue"
      :errors="errors['new_password']"
    />
    <UIInput
      :label="$t.passwords.inputPasswordConfirm"
      type="password"
      v-model="passwordConfirmValue"
      :errors="errors['password_confirmation']"
    />
    <button class="btn" :class="{ disabled: requestController.loading[url] }">
      {{ $t.passwords.btn }}
    </button>
  </form>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useFormValidation } from '~/hooks/useFormValidation';
import { PasswordScheme } from '~/utils/validation';
import { useProfileStore } from '~/stores/ProfileController';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useRequestStore } from '~/stores/RequestController';
import { useTranslate } from '~/hooks/useTranslate';

/**
 * Переменные ----------------
 */
const url = '/account/password/change';
const profileController = useProfileStore();
const requestController = useRequestStore();
const passwordValue = ref('');
const newPasswordValue = ref('');
const passwordConfirmValue = ref('');
const $t = await useTranslate('account');
const { errors, validateForm } = useFormValidation();

/**
 * Отслеживание переменных ----------------
 */
// Показать warning c ошибками
watch(profileController.errors, () => {
  profileController.setErrors(profileController.errors);
});

/**
 * Методы ----------------
 */
// Изменение пароля пользователя
const onChangePassword = async () => {
  // Убираем warning
  profileController.setErrors([]);
  profileController.setMessage('');

  // Объект с данными
  const dto = {
    password: passwordValue.value,
    new_password: newPasswordValue.value,
    password_confirmation: passwordConfirmValue.value,
  };

  // Вызываем хук для валидации форм
  const isValid = await validateForm(dto, PasswordScheme);
  if (!isValid) return false;

  // Обновляем пароль пользователя
  const { message } = await useCustomFetch(url, {
    body: dto,
    method: 'POST',
  });

  if (message) {
    // Отображаем сообщение об успешном изменении
    profileController.setMessage($t.passwords.successMessage);
    // Перемещаем пользователя на вверх
    const block = document.getElementById('scroll');
    block && block.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Если, есть ошибки, то перемещаем пользователя на вверх
  if (profileController.errors.length) {
    const block = document.getElementById('scroll');
    block && block.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.form {
  width: 100%;
  margin-top: 65px;
}
</style>
