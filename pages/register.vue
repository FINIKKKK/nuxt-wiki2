<template>
  <NuxtLayout name="auth">
    <form class="form" @submit.prevent="onRegister">
      <h1>Регистрация</h1>
      <p>
        У вас уже есть аккаунт?
        <NuxtLink href="/login">Войдите в систему</NuxtLink>
      </p>

      <Input
        label="Имя"
        v-model="nameValue"
        :errors="errorsValidate['name'] || []"
      />
      <Input
        label="Электронная почта"
        v-model="emailValue"
        :errors="errorsValidate['email'] || []"
      />
      <Input
        label="Номер мобильного телефона"
        v-model="phoneValue"
        :errors="errorsValidate['phone'] || []"
      />
      <Input
        label="Пароль"
        type="password"
        v-model="passwordValue"
        :errors="errorsValidate['password'] || []"
      />

      <button class="btn" :class="{ disabled: isLoading }">
        Зарегистрироваться
      </button>
      <small
        >Нажимая на кнопку, вы соглашаетесь с условиями<a href="#"
          >Оферты и лицензионного договора</a
        >
        и <a href="#">Политикой обработки персональных данных.</a></small
      >
    </form>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import Input from '~/componets/UI/Input.vue';
import { useFormValidation } from '~/hooks/useFormValidation';
import { RegisterScheme } from '~/utils/validation';

/**
 * Пользовательские переменные ----------------
 */
const nameValue = ref(''); // Значение имени
const emailValue = ref(''); // Значение email
const phoneValue = ref(''); // Значение телефона
const passwordValue = ref(''); // Значение пароля

/**
 * Хуки ----------------
 */
const { errorsValidate, errors, isLoading, validateForm } = useFormValidation(); // Для обработки формы

/**
 * Методы ----------------
 */
// Регистрация пользователя
const onRegister = async () => {
  // Объект с данными
  const dto = {
    name: nameValue.value,
    email: emailValue.value,
    phone: phoneValue.value,
    password: passwordValue.value,
  };

  // Вызываем хук для валидации форм
  await validateForm(dto, RegisterScheme, async () => {
    // Регистрация пользователя
    // const { data } = await Api().auth.register(dto);
  });
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
