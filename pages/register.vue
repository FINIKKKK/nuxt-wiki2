<template>
  <NuxtLayout name="auth">
    <form class="form-auth" @submit.prevent="onRegister">
      <h1>Регистрация</h1>
      <p>
        У вас уже есть аккаунт?
        <NuxtLink href="/login">Войдите в систему</NuxtLink>
      </p>

      <Input
        label="Имя"
        v-model="firstNameValue"
        :errors="errorsValidate['first_name'] || []"
      />
      <Input
        label="Фамилия"
        v-model="lastNameValue"
        :errors="errorsValidate['last_name'] || []"
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
import Input from '~/components/UI/Input.vue';
import { useFormValidation } from '~/hooks/useFormValidation';
import { RegisterScheme } from '~/utils/validation';
import { Api } from '~/api';
import { useUserStore } from '~/stores/UserStore';

/**
 * Системные переменные ----------------
 */
const token = useCookie('token'); // Токен из куки
const userStore = useUserStore(); // Хранилище данных пользователя
const router = useRouter(); // Роутер

/**
 * Пользовательские переменные ----------------
 */
const firstNameValue = ref(''); // Значение имени
const lastNameValue = ref(''); // Значение фамилии
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
    first_name: firstNameValue.value,
    last_name: lastNameValue.value,
    email: emailValue.value,
    phone: phoneValue.value,
    password: passwordValue.value,
  };

  // Вызываем хук для валидации форм
  await validateForm(dto, RegisterScheme, async () => {
    // Регистрация пользователя
    const { data } = await Api().account.register(dto);
    // Устанавливаем токен в куки
    token.value = data.token;
    // Устанавливаем данные пользователя в хранилище
    userStore.setUser(data.user);
    // Перенаправляем пользователя на страницу создания компании
    await router.push('/create_company');
  });
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
