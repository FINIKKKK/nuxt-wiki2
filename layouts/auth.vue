<template>
  <main>
    <div class="content">
      <img class="logo" src="../assets/img/svg/full_logo.svg" alt="logo">

      <form class="form">
        <h1>Регистрация</h1>
        <p>У вас уже есть аккаунт?
          <NuxtLink href="/login">Войдите в систему</NuxtLink>
        </p>

        <Input label="Имя"/>
        <Input label="Электронная почта"/>
        <Input label="Номер мобильного телефона"/>
        <Input label="Пароль"/>

        <button class="btn">Зарегистрироваться</button>
        <small>Нажимая на кнопку, вы соглашаетесь с условиями<a href="#">Оферты и лицензионного договора</a> и <a
            href="#">Политикой
          обработки персональных данных.</a></small>
      </form>
    </div>
  </main>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import Input from "~/componets/UI/Input.vue";

</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
main {
  background-image: url("@/assets/img/bg.png");
}

.content {
  min-height: 100vh;
  width: 45%;
  background-color: $white;
  padding: 48px 135px 160px;
  margin-left: auto;
}

.logo {
  width: 135px;
  margin-bottom: 109px;
}

.form {
  width: 325px;
  h1 {
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 8px;
  }
  p {
    margin-bottom: 36px;
  }
  .btn {
    width: 100%;
    margin-bottom: 24px;
  }
  small {
    font-size: 12px;
    line-height: 16px;
    a {
      text-decoration: underline;
    }
  }
}
</style>
