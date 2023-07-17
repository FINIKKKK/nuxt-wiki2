<template>
  <NuxtLayout name="auth">
    <form class="form-auth" @submit.prevent="onLogin">
      <h1>{{ $t.login.title }}</h1>
      <p>
        {{ $t.login.text }}
        <NuxtLink href="/register">{{ $t.login.link }}</NuxtLink>
      </p>

      <div class="errors">
        <span
          v-for="(error, index) in requestController.errors[url]"
          :key="index"
          >{{ error }}</span
        >
      </div>

      <UIInput
        :label="$t.login.inputEmail"
        v-model="emailValue"
        :errors="errors['email']"
      />
      <UIInput
        :label="$t.login.inputPassword"
        v-model="passwordValue"
        type="password"
        :errors="errors['password']"
      />

      <p>
        <NuxtLink href="/reset_password">{{
          $t.login.forgotPassword
        }}</NuxtLink>
      </p>
      <button class="btn" :class="{ disabled: requestController.loading[url] }">
        {{ $t.login.btn }}
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
import { useTranslate } from '~/hooks/useTranslate';

/**
 * Переменные ----------------
 */
const token = useCookie('token');
const userController = useUserStore();
const router = useRouter();
const requestController = useRequestStore();
const $t = await useTranslate('auth');
const url = 'account/auth';
const emailValue = ref('');
const passwordValue = ref('');
const { errors, validateForm } = useFormValidation();

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

  if (data) {
    // Устанавливаем токен в куки
    token.value = data.token;
    // Устанавливаем данные пользователя в хранилище
    userController.setUser(data.user);
    // Перенаправляем пользователя на главную
    await router.push('/');
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>