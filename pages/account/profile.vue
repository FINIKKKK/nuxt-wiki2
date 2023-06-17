<template>
  <NuxtLayout name="main">
    <!-- Отображение ошибок -->
    <Warning
      v-if="errors.length || successMessage"
      :errors="errors as string[]"
      :successMessage="successMessage as string"
    />

    <!-- Формы -->
    <div class="flex">
      <div class="left">
        <!-- Форма для изменения данных пользователя -->
        <FormUserData
          @showWarning="setErrors"
          @showWarningSuccess="setSuccessMessage"
        />
        <!-- Форма для изменения пароля пользователя -->
        <FormUserPassword
          @showWarning="setErrors"
          @showWarningSuccess="setSuccessMessage"
        />
      </div>

      <!-- Изменяем аватар пользователя -->
      <div class="avatar">
        <!-- Аватар -->
        <div class="img">
          <!-- Если, есть аватарка -->
          <img
            :src="userStore.user?.avatar"
            alt=""
            v-if="userStore.user?.avatar"
          />
          <!-- Если, нет аватарки -->
          <svg-icon name="avatar" v-else />
        </div>
        <div class="btn-inline" :class="{ disabled: isLoading }">
          <span>Загрузить фото</span>
          <input type="file" v-on:change="onChangeAvatar" />
        </div>
        <p class="pretext">
          Используйте изображение размером не менее 256 на 256 пикселей в
          формате .jpg или .png
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import FormUserData from '~/componets/ProfileForms/FormUserData.vue';
import FormUserPassword from '~/componets/ProfileForms/FormUserPassword.vue';
import Warning from '~/componets/UI/Warning.vue';
import { Api } from '~/api';
import { useFormValidation } from '~/hooks/useFormValidation';
import { useUserStore } from '~/stores/UserStore';

/**
 * Системные переменные ----------------
 */
const userStore = useUserStore(); // Хранилище пользователя

/**
 * Пользовательские переменные ----------------
 */
const successMessage = ref<string>(''); // Сообщение об успешном действии

/**
 * Хуки ----------------
 */
// Для обработки ошибок
const { errors, isLoading, validateForm } = useFormValidation();

/**
 * Методы ----------------
 */
// Установление значения ошибок (событие)
const setErrors = (value: any) => {
  errors.value = value;
};
// Установление значения сообщение об успешном действии (событие)
const setSuccessMessage = (value: string) => {
  successMessage.value = value;
};
// Метод изменения аватара пользователя
const onChangeAvatar = async (e: any) => {
  if (e.target.files[0]) {
    // Убираем warning
    errors.value = [];
    successMessage.value = '';
    // Вызываем хук для обработки валидации
    await validateForm(undefined, undefined, async () => {
      // Обновляем аватар на бэкенде
      const { data } = await Api().user.updateAvatar(e.target.files[0]);
      // Обновляем аватар в хранилище
      userStore.setUserAvatar(data);
    });
    // Вызываем warning с сообщением об успешной загрузке
    successMessage.value = 'Аватар успешно изменен';
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.warning {
  margin: 0 -50px 50px;
}

.flex {
  display: flex;
  justify-content: space-between;
}

.avatar {
  width: 203px;
  text-align: center;
  margin-right: 50px;
  .img {
    width: 100px;
    height: 100px;
    margin: 0 auto 25px;
    img {
      border: 2px solid $blue;
      object-fit: cover;
    }
    img,
    svg {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
    svg {
      fill: $blue2;
    }
  }
  .btn-inline {
    margin-bottom: 21px;
    input {
      cursor: pointer;
    }
  }
}
</style>
