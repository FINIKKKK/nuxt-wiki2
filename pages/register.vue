<template>
  <NuxtLayout name="auth">
    <form class="form-auth" @submit.prevent="onRegister">
      <h1>{{ $t.register.title }}</h1>
      <p>
        {{ $t.register.text }}
        <NuxtLink href="/login">{{ $t.register.link }}</NuxtLink>
      </p>

      <div class="errors">
        <span
          v-for="(error, index) in requestController.errors[url]"
          :key="index"
          >{{ error }}</span
        >
      </div>

      <UIInput
        :label="$t.register.inputFirstName"
        v-model="firstNameValue"
        :errors="errors['first_name']"
      />
      <UIInput
        :label="$t.register.inputLastName"
        v-model="lastNameValue"
        :errors="errors['last_name']"
      />
      <UIInput
        :label="$t.register.inputEmail"
        v-model="emailValue"
        :errors="errors['email']"
      />
      <UIInput
        :label="$t.register.inputPhone"
        v-model="phoneValue"
        :errors="errors['phone']"
        type="phone"
      />
      <UIInput
        :label="$t.register.inputPassword"
        v-model="passwordValue"
        :errors="errors['password']"
        type="password"
      />

      <button class="btn" :class="{ disabled: requestController.loading[url] }">
        {{ $t.register.btn }}
      </button>
      <small
        >{{ $t.register.small }}<a href="#">{{ $t.register.smallLink1 }}</a>
        {{ $t.register.smallArticle }}
        <a href="#">{{ $t.register.smallLink2 }}</a></small
      >
    </form>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useFormValidation } from '~/hooks/useFormValidation';
import { RegisterScheme } from '~/utils/validation';
import { useUserStore } from '~/stores/UserController';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useRequestStore } from '~/stores/RequestController';
import { TAuthData } from '~/utils/types/account';


/**
 * Переменные ----------------
 */
const token = useCookie('token');
const userController = useUserStore();
const requestController = useRequestStore();
const router = useRouter();
const url = 'account/register/secure';
const firstNameValue = ref('');
const lastNameValue = ref('');
const emailValue = ref('');
const phoneValue = ref('');
const passwordValue = ref('');
const { errors, validateForm } = useFormValidation();
const $t = await useTranslate('auth');

/**
 * Методы ----------------
 */
// Регистрация пользователя
const onRegister = async () => {
  // Объект с данными
  const dto = {
    first_name: firstNameValue.value,
    last_name: lastNameValue.value,
    email: emailValue.value,
    phone: phoneValue.value,
    password: passwordValue.value,
  };

  // Вызываем хук для валидации форм
  const isValid = await validateForm(dto, RegisterScheme);
  if (!isValid) return false;

  // Регистрация пользователя
  const { data } = await useCustomFetch<TAuthData>(url, {
    body: dto,
    method: 'POST',
  });

  if (data.value) {
    // Устанавливаем токен в куки
    token.value = data.value.token;
    // Устанавливаем данные пользователя в хранилище
    userController.setUser(data.value.user);
    // Перенаправляем пользователя на страницу создания компании
    await router.push('/create_company');
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
