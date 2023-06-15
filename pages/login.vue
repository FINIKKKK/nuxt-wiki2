<template>
  <NuxtLayout name="auth">
    <form class="form">
      <h1>Вход в систему</h1>
      <p>
        Еще нет аккаунта?
        <NuxtLink href="/register">Зарегестрироваться</NuxtLink>
      </p>

      <Input label="Электронная почта" />
      <Input label="Пароль" type="password" />

      <p>
        <NuxtLink href="/reset_password">Забыли пароль? </NuxtLink>
      </p>
      <button class="btn">Войти</button>
    </form>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import Input from '~/componets/UI/Input.vue';
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
