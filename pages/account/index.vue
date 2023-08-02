<template>
  <NuxtLayout name="main" :nav="nav">
    <!-- Отображение ошибок -->
    <UIWarning
      v-if="profileController.errors.length || profileController.message"
      :errors="errors"
      :message="profileController.message"
      class="warning"
    />

    <!-- Формы -->
    <div class="flex">
      <div class="left">
        <!-- Форма для изменения данных пользователя -->
        <ProfilePageUserData />
        <!-- Форма для изменения пароля пользователя -->
        <ProfilePagePassword />
      </div>

      <!-- Изменяем аватарки пользователя -->
      <ProfilePageAvatar />
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
const $t = await useTranslate('account');
const $t2 = await useTranslate('errors');
const nav = [{ label: $t.title, link: route.path }];

/**
 * Хуки ----------------
 */
// Убираем warning при переходе на страницу
onBeforeRouteLeave((to, from, next) => {
  profileController.setErrors([]);
  profileController.setMessage('');
  next();
});

/**
 * Вычисляемое ----------------
 */
// Ошибки
const errors = computed(() => {
  console.log(profileController.errors);
  if (profileController.errors[0].includes('image')) {
    return [$t2.image];
  }
  if (profileController.errors[0].includes('email')) {
    return [$t2.email];
  }
  if (profileController.errors[0].includes('hash')) {
    return [$t2.password];
  }
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
