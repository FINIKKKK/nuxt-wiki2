<template>
  <NuxtLayout name="auth">
    <form class="form-auth" @submit.prevent="onRegister">
      <h1>Регистрация</h1>
      <p>
        У вас уже есть аккаунт?
        <NuxtLink href="/login">Войдите в систему</NuxtLink>
      </p>

      <div class="errors">
        <span
          v-for="(error, index) in requestController.errors[url]"
          :key="index"
          >{{ error }}</span
        >
      </div>

      <UIInput
        label="Имя"
        v-model="firstNameValue"
        :errors="errors['first_name']"
      />
      <UIInput
        label="Фамилия"
        v-model="lastNameValue"
        :errors="errors['last_name']"
      />
      <UIInput
        label="Электронная почта"
        v-model="emailValue"
        :errors="errors['email']"
      />
      <UIInput
        label="Номер мобильного телефона"
        v-model="phoneValue"
        :errors="errors['phone']"
      />
      <UIInput
        label="Пароль"
        type="password"
        v-model="passwordValue"
        :errors="errors['password']"
      />

      <button class="btn" :class="{ disabled: requestController.loading[url] }">
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
import { useFormValidation } from '~/hooks/useFormValidation';
import { RegisterScheme } from '~/utils/validation';
import { useUserStore } from '~/stores/UserController';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useRequestStore } from '~/stores/RequestController';
import { TAuthData } from '~/utils/types/account';

/**
 * Системные переменные ----------------
 */
const token = useCookie('token'); // Токен из куки
const userController = useUserStore(); // Хранилище данных пользователя
const requestController = useRequestStore(); // Хранилище запроса
const router = useRouter(); // Роутер

/**
 * Пользовательские переменные ----------------
 */
const url = 'account/register/secure'; // URL запроса
const firstNameValue = ref(''); // Значение имени
const lastNameValue = ref(''); // Значение фамилии
const emailValue = ref(''); // Значение email
const phoneValue = ref(''); // Значение телефона
const passwordValue = ref(''); // Значение пароля

/**
 * Хуки ----------------
 */
const { errors, validateForm } = useFormValidation(); // Для валидации формы

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
