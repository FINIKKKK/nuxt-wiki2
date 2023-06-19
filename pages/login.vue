<template>
  <NuxtLayout name="auth">
    <form class="form-auth" @submit.prevent="onLogin">
      <h1>Вход в систему</h1>
      <p>
        Еще нет аккаунта?
        <NuxtLink href="/register">Зарегистрироваться</NuxtLink>
      </p>

      <div class="errors">
        <span v-for="(error, index) in errors" :key="index">{{ error }}</span>
      </div>

      <Input
        label="Электронная почта"
        v-model="emailValue"
        :errors="errorsValidate['email'] || []"
      />
      <Input
        label="Пароль"
        v-model="passwordValue"
        type="password"
        :errors="errorsValidate['password'] || []"
      />

      <p>
        <NuxtLink href="/reset_password">Забыли пароль?</NuxtLink>
      </p>
      <button class="btn" :class="{ disabled: isLoading }">Войти</button>
    </form>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import Input from '~/components/UI/Input.vue';
import { useUserStore } from '~/stores/UserStore';
import { useFormValidation } from '~/hooks/useFormValidation';
import { Api } from '~/api';
import { LoginScheme } from '~/utils/validation';

/**
 * Системные переменные ----------------
 */
const token = useCookie('token'); // Токен из куки
const userStore = useUserStore(); // Хранилище данных пользователя
const router = useRouter(); // Роутер

/**
 * Пользовательские переменные ----------------
 */
const emailValue = ref(''); // Значение email
const passwordValue = ref(''); // Значение пароля

/**
 * Хуки ----------------
 */
const { errorsValidate, errors, isLoading, validateForm } = useFormValidation(); // Для обработки формы

/**
 * Методы ----------------
 */
// Авторизуем пользователя
const onLogin = async () => {
  // Объект с данными
  const dto = {
    email: emailValue.value,
    password: passwordValue.value,
  };

  // Вызываем хук для валидации форм
  await validateForm(dto, LoginScheme, async () => {
    // Регистрация пользователя
    const { data } = await Api().account.login(dto);
    // Устанавливаем токен в куки
    token.value = data.token;
    // Устанавливаем данные пользователя в хранилище
    userStore.setUser(data.user);
    // Перенаправляем пользователя на главную
    await router.push('/');
  });
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
