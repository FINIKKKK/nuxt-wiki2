<template>
  <NuxtLayout name="auth">
    <form class="form-auth" @submit.prevent="onLogin">
      <h1>Вход в систему</h1>
      <p>
        Еще нет аккаунта?
        <NuxtLink href="/register">Зарегистрироваться</NuxtLink>
      </p>

      <div class="errors">
        <span
          v-for="(error, index) in requestController.errors[url]"
          :key="index"
          >{{ error }}</span
        >
      </div>

      <UIInput
        label="Электронная почта"
        v-model="emailValue"
        :errors="errorsValidate['email']"
      />
      <UIInput
        label="Пароль"
        v-model="passwordValue"
        type="password"
        :errors="errorsValidate['password']"
      />

      <p>
        <NuxtLink href="/reset_password">Забыли пароль?</NuxtLink>
      </p>
      <button class="btn" :class="{ disabled: requestController.loading[url] }">
        Войти
      </button>
    </form>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useUserStore } from '~/stores/UserController';
import { useFormValidation } from '~/hooks/useFormValidation';
import { LoginScheme } from '~/utils/validation';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useRequestStore } from '~/stores/RequestController';
import { TAuthData } from '~/utils/types/account';

/**
 * Системные переменные ----------------
 */
const token = useCookie('token'); // Токен из куки
const userController = useUserStore(); // Хранилище данных пользователя
const router = useRouter(); // Роутер
const requestController = useRequestStore(); // Хранилище запроса

/**
 * Пользовательские переменные ----------------
 */
const url = 'account/auth'; // URL запроса
const emailValue = ref(''); // Значение email
const passwordValue = ref(''); // Значение пароля

/**
 * Хуки ----------------
 */
const { errorsValidate, validateForm } = useFormValidation(); // Для валидации формы

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
  const isValid = await validateForm(dto, LoginScheme);
  if (!isValid) return false;

  // Авторизация пользователя
  const { data } = await useCustomFetch<TAuthData>(url, {
    body: dto,
    method: 'POST',
  });

  if (data.value) {
    // Устанавливаем токен в куки
    token.value = data.value?.token;
    // Устанавливаем данные пользователя в хранилище
    userController.setUser(data.value?.user);
    // Перенаправляем пользователя на главную
    await router.push('/');
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
