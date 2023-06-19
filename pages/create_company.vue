<template>
  <NuxtLayout name="main" title="">
    <form class="form" @submit.prevent="onAddTeam">
      <h2 class="title">Создать компанию</h2>

      <div class="content">
        <Input
          label="Название вашей компании"
          v-model="nameValue"
          :errors="errorsValidate['name'] || []"
        />
        <Input
          label="Адресс вашей компании"
          v-model="addressValue"
          :errors="errorsValidate['address'] || []"
          type="address"
        />
        <p>
          Нажимая кнопку «Создать компанию» вы принимаете
          <a href="#">Условия обслуживания в отношении продуктов ITL</a> и
          соглашаетесь с <a href="#">Политикой конфиденциальности.</a>
        </p>
      </div>

      <button class="btn" :class="{ disabled: isLoading }">
        Создать компанию
      </button>
    </form>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import Input from '~/components/UI/Input.vue';
import { Api } from '~/api';
import { useFormValidation } from '~/hooks/useFormValidation';
import { useUserStore } from '~/stores/UserStore';
import { TeamScheme } from '~/utils/validation';

/**
 * Системные переменные ----------------
 */
const userStore = useUserStore(); // Хранилище данных пользователя
const router = useRouter(); // Роутер

/**
 * Пользовательские переменные ----------------
 */
const nameValue = ref(''); // Значение названия
const addressValue = ref(''); // Значение адресса

/**
 * Хуки ----------------
 */
const { errorsValidate, errors, isLoading, validateForm } = useFormValidation(); // Для обработки формы

/**
 * Методы ----------------
 */
// Создаем команду
const onAddTeam = async () => {
  // Объект с данными
  const dto = {
    name: nameValue.value,
    code: addressValue.value,
  };

  // Вызываем хук для валидации форм
  await validateForm(dto, TeamScheme, async () => {
    // Создаем команду
    const { data } = await Api().team.add(dto);
    // Перенаправляем пользователя на главную
    await router.push('/add_users');
  });
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
