<template>
  <NuxtLayout name="auth">
    <form class="form-auth" @submit.prevent="onSendCode">
      <h1>{{ $t.resetPassword.title }}</h1>

      <div class="errors">
        <span
          v-for="(error, index) in requestController.errors[url]"
          :key="index"
          >{{ error }}</span
        >
      </div>

      <UIInput
        :label="$t.resetPassword.inputEmail"
        v-model="emailValue"
        :errors="errors['email']"
      />

      <button class="btn" :class="{ disabled: requestController.loading[url] }">
        {{ $t.resetPassword.btn }}
      </button>
    </form>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useRequestStore } from '~/stores/RequestController';
import { useTranslate } from '~/hooks/useTranslate';
import { useFormValidation } from '~/hooks/useFormValidation';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import {ResetPasswordScheme} from "~/utils/validation";

/**
 * Переменные ----------------
 */
const url = 'account/reset';
const requestController = useRequestStore();
const $t = await useTranslate('auth');
const emailValue = ref();
const { errors, validateForm } = useFormValidation();
const router = useRouter();

/**
 * Методы ----------------
 */
// Отправляем код на почту
const onSendCode = async () => {
  // Данные
  const dto = {
    email: emailValue.value,
  };

  // Вызываем хук для валидации форм
  const isValid = await validateForm(dto, ResetPasswordScheme);
  if (!isValid) return false;

  // Авторизация пользователя
  const { data } = await useCustomFetch(url, {
    body: dto,
    method: 'POST',
  });

  if (data) {
    // Перенаправляем пользователя
    await router.push('/');
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
