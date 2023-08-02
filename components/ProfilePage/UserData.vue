<template>
  <form class="form" @submit.prevent="onChangeUserData">
    <h2 class="title">{{ $t.userData.title }}</h2>
    <UIInput
      :label="$t.userData.inputFirstName"
      v-model="firstNameValue"
      :errors="errors['firstName']"
    />
    <UIInput
      :label="$t.userData.inputLastName"
      v-model="lastNameValue"
      :errors="errors['lastName']"
    />
    <UIInput
      :label="$t.userData.inputEmail"
      v-model="emailValue"
      :errors="errors['email']"
    />
    <button class="btn" :class="{ disabled: requestController.loading[url] }">
      {{ $t.userData.btn }}
    </button>
  </form>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useFormValidation } from '~/hooks/useFormValidation';
import { UserDataScheme } from '~/utils/validation';
import { useUserStore } from '~/stores/UserController';
import { useProfileStore } from '~/stores/ProfileController';
import { useRequestStore } from '~/stores/RequestController';
import { useCustomFetch } from '~/hooks/useCustomFetch';


/**
 * Переменные ----------------
 */
const url = '/account/common/edit';
const userController = useUserStore();
const profileController = useProfileStore();
const requestController = useRequestStore();
const firstNameValue = ref(userController.user?.first_name || '');
const lastNameValue = ref(userController.user?.last_name || '');
const emailValue = ref(userController.user?.email || '');
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
// Изменить данные пользователя
const onChangeUserData = async () => {
  // Убираем warning
  profileController.setErrors([]);
  profileController.setMessage('');

  // Данные объекта
  const dto = {
    first_name: firstNameValue.value,
    last_name: lastNameValue.value,
    email: emailValue.value,
  };

  // Вызываем хук для валидации форм
  const isValid = await validateForm(dto, UserDataScheme);
  if (!isValid) return false;

  // Обновляем данные пользователя
  const { message } = await useCustomFetch<any>(url, {
    body: dto,
    method: 'POST',
  });

  if (message) {
    // Обновляем данные в хранилище
    userController.updateUserData(dto);
    // Отображаем сообщение об успешном изменении
    profileController.setMessage($t.userData.successMessage);
  } else {
    profileController.setErrors(requestController.errors[url]);
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.form {
  width: 100%;
}
</style>
