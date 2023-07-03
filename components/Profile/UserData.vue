<template>
  <form class="form" @submit.prevent="onChangeUserData">
    <h2 class="title">Личные данные</h2>
    <div class="content">
      <UIInput
        label="Имя"
        v-model="firstNameValue"
        :errors="errors['firstName']"
      />
      <UIInput
        label="Фамилия"
        v-model="lastNameValue"
        :errors="errors['lastName']"
      />
      <UIInput
        label="Email"
        v-model="emailValue"
        :errors="errors['email']"
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
import { UserDataScheme } from '~/utils/validation';
import { useUserStore } from '~/stores/UserController';
import { useProfileStore } from '~/stores/ProfileController';
import { useRequestStore } from '~/stores/RequestController';
import { useCustomFetch } from '~/hooks/useCustomFetch';

/**
 * Системные переменные ----------------
 */
const userController = useUserStore(); // Хранилище пользователя
const profileController = useProfileStore(); // Хранилище профиля
const requestController = useRequestStore(); // Хранилище запроса

/**
 * Пользовательские переменные ----------------
 */
const url = '/account/common/edit'; // URL запроса
const firstNameValue = ref(userController.user?.first_name || ''); // Значене имени
const lastNameValue = ref(userController.user?.last_name || ''); // Значене фамилии
const emailValue = ref(userController.user?.email || ''); // Значене email

/**
 * Хуки ----------------
 */
const { errors, validateForm } = useFormValidation(); // Для валидации формы

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
  const { data } = await useCustomFetch<any>(url, {
    body: dto,
    method: 'POST',
  });

  if (data.value) {
    // Обновляем данные в хранилище
    userController.updateUserData(dto);
    // Отображаем сообщение об успешном изменении
    profileController.setMessage('Данные успешно изменены');
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
