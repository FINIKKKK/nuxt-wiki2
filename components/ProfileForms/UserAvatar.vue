<template>
  <div class="avatar">
    <!-- Аватарка -->
    <div class="img">
      <!-- Если, есть аватарка -->
      <img :src="userStore.user?.picture" alt="avatar" />
    </div>
    <div class="btn-inline" :class="{ disabled: isLoading }">
      <span>Загрузить фото</span>
      <input type="file" v-on:change="onChangeAvatar" />
    </div>
    <p class="pretext">
      Используйте изображение размером не менее 256 на 256 пикселей в формате
      .jpg или .png
    </p>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useUserStore } from '~/stores/UserController';
import { useFormValidation } from '~/hooks/useFormValidation';
import { Api } from '~/api';

/**
 * События ----------------
 */
const emits = defineEmits(['showWarningErrors', 'showWarningMessages']);

/**
 * Системные переменные ----------------
 */
const userStore = useUserStore(); // Хранилище пользователя

/**
 * Хуки ----------------
 */
// Для обработки ошибок
const { errors, isLoading, validateForm } = useFormValidation();

/**
 * Отслеживание переменных ----------------
 */
// Следить за errors
watch(errors, () => {
  // Показать warning c ошибками
  emits('showWarningErrors', errors.value);
});

// Метод изменения аватарки пользователя
const onChangeAvatar = async (e: any) => {
  if (e.target.files[0]) {
    // Убираем warning
    emits('showWarningErrors', []);
    emits('showWarningMessages', '');
    // Вызываем хук для обработки валидации
    await validateForm(undefined, undefined, async () => {
      // Обновляем аватарку
      const { data } = await Api().account.avatar(e.target.files[0]);
      console.log(data.url);
      // Обновляем аватарку в хранилище
      userStore.updateUserAvatar(data.url);
    });
    // Отображаем сообщение об успешном изменении
    emits('showWarningMessages', 'Аватарка успешно изменена');
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.avatar {
  width: 203px;
  text-align: center;
  margin-right: 50px;
  position: relative;
  .img {
    width: 100px;
    height: 100px;
    margin: 0 auto 25px;
    img {
      border: 2px solid $blue;
      object-fit: cover;
    }
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
  .btn-inline {
    margin-bottom: 21px;
    position: relative;
    input {
      cursor: pointer;
    }
  }
}
</style>