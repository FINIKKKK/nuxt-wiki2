<template>
  <form class="form" @submit.prevent="onChangePassword">
    <h2 class="title">Безопасность</h2>
    <div class="content">
      <UIInput
        label="Текущий пароль"
        type="password"
        v-model="passwordValue"
        :errors="errorsValidate['password']"
      />
      <UIInput
        label="Новый пароль"
        type="password"
        v-model="newPasswordValue"
        :errors="errorsValidate['new_password']"
      />
      <UIInput
        label="Повторить пароль"
        type="password"
        v-model="passwordConfirmValue"
        :errors="errorsValidate['password_confirmation']"
      />
    </div>
    <button class="btn" :class="{ disabled: requestController.loading[url] }">
      Сохранить
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

/**
 * Системные переменные ----------------
 */
const profileController = useProfileStore(); // Хранилище профиля
const requestController = useRequestStore(); // Хранилище запроса

/**
 * Пользоватеьские переменные ----------------
 */
const url = '/account/password/change'; // URL запроса
const passwordValue = ref(''); // Значение текущего пароля
const newPasswordValue = ref(''); // Значение нового пароля
const passwordConfirmValue = ref(''); // Значение подтвежденного пароля

/**
 * Хуки ----------------
 */
const { errorsValidate, validateForm } = useFormValidation(); // Для валидации формы

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
  const { data } = await useCustomFetch(url, {
    body: dto,
    method: 'POST',
  });

  if (data) {
    // Отображаем сообщение об успешном изменении
    profileController.setMessage('Пароль успешно изменен');
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
  margin-top: 75px;
}
</style>
