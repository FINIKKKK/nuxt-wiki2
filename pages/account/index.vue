<template>
  <NuxtLayout name="main" :nav="nav">
    <!-- Отображение ошибок -->
    <UIWarning
      v-if="profileController.errors.length || profileController.message"
      :errors="profileController.errors"
      :message="profileController.message"
    />

    <!-- Формы -->
    <div class="flex">
      <div class="left">
        <!-- Форма для изменения данных пользователя -->
        <ProfileUserData />
        <!-- Форма для изменения пароля пользователя -->
        <ProfilePassword />
      </div>

      <!-- Изменяем аватарки пользователя -->
      <ProfileAvatar />
    </div>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useProfileStore } from '~/stores/ProfileController';

/**
 * Переменные ----------------
 */
const profileController = useProfileStore();
const route = useRoute();
const nav = [{ label: 'Профиль', link: route.path }];

/**
 * Хуки ----------------
 */
// Убираем warning при переходе на страницу
onBeforeRouteLeave((to, from, next) => {
  profileController.setErrors([]);
  profileController.setMessage('');
  next();
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.warning {
  margin: 0 -50px 50px;
}

.flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.left {
  width: 60%;
}
</style>
