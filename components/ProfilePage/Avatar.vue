<template>
  <div class="avatar">
    <!-- Аватарка -->
    <div class="img">
      <!-- Если, есть аватарка -->
      <img :src="userController.user?.picture" alt="avatar" />
    </div>
    <div
      class="btn-inline"
      :class="{ disabled: requestController.loading[url] }"
    >
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
import { useRequestStore } from '~/stores/RequestController';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useProfileStore } from '~/stores/ProfileController';
import { AsyncData, useFetch } from '#app';

/**
 * Переменные ----------------
 */
const userController = useUserStore();
const requestController = useRequestStore();
const profileController = useProfileStore();
const url = '/account/picture/change';
const config = useRuntimeConfig();

/**
 * Отслеживание переменных ----------------
 */
// Показать warning c ошибками
watch(profileController.errors, () => {
  profileController.setErrors(profileController.errors);
});

// Метод изменения аватарки пользователя
const onChangeAvatar = async (e: any) => {
  // Убираем warning
  profileController.setErrors([]);
  profileController.setMessage('');

  // Данные
  const formData = new FormData();
  formData.append('image', e.target.files[0]);
  // Обновляем аватарку
  const { data } = await useCustomFetch<{ url: string }>(
    url,
    { method: 'POST' },
    formData,
  );

  if (data) {
    // Обновляем аватарку в хранилище
    userController.updateUserAvatar(data.url);
    // Отображаем сообщение об успешном изменении
    profileController.setMessage('Аватарка успешно изменена');
  } else {
    profileController.setErrors(requestController.errors[url]);
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.avatar {
  width: 203px;
  text-align: center;
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
