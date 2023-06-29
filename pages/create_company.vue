<template>
  <NuxtLayout name="main" title="">
    <!-- Отображение ошибок -->
    <UIWarning
      v-if="requestController.loading[url]?.length"
      :errors="requestController.loading[url]"
    />

    <!-- Форма -->
    <form class="form" @submit.prevent="onAddTeam">
      <h2 class="title">Создать компанию</h2>

      <div class="content">
        <UIInput
          label="Название вашей компании"
          v-model="nameValue"
          :errors="errorsValidate['name']"
        />
        <UIInput
          label="Адресс вашей компании"
          v-model="addressValue"
          :errors="errorsValidate['address']"
          type="address"
        />
        <p>
          Нажимая кнопку «Создать компанию» вы принимаете
          <a href="#">Условия обслуживания в отношении продуктов ITL</a> и
          соглашаетесь с <a href="#">Политикой конфиденциальности.</a>
        </p>
      </div>

      <button class="btn" :class="{ disabled: requestController.loading[url] }">
        Создать компанию
      </button>
    </form>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useFormValidation } from '~/hooks/useFormValidation';
import { useUserStore } from '~/stores/UserController';
import { TeamScheme } from '~/utils/validation';
import { useRequestStore } from '~/stores/RequestController';
import { useCustomFetch } from '~/hooks/useCustomFetch';

/**
 * Системные переменные ----------------
 */
const userStore = useUserStore(); // Хранилище данных пользователя
const router = useRouter(); // Роутер
const requestController = useRequestStore(); // Хранилище запроса

/**
 * Пользовательские переменные ----------------
 */
const url = 'team/add'; // URL запроса
const nameValue = ref(''); // Значение названия
const addressValue = ref(''); // Значение адресса

/**
 * Хуки ----------------
 */
const { errorsValidate, validateForm } = useFormValidation(); // Для обработки формы

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
  const isValid = await validateForm(dto, TeamScheme);
  if (!isValid) return false;

  // Создание команды
  const { data } = await useCustomFetch<number>(url, {
    body: dto,
    method: 'POST',
  });

  if (data.value) {
    // Перенаправляем пользователя на главную
    await router.push('/add_users');
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
