<template>
  <div class="error404">
    <div class="content">
      <h1 class="title">{{error.statusCode}}</h1>
      <p class="text">
        К сожалению, мы не можем найти страницу, которую вы ищете. Возможно, она
        переместилась, была удалена или никогда не существовала.
      </p>
      <p class="text2">
        Пожалуйста, вернитесь на
        <NuxtLink to="/">главную страницу</NuxtLink>
        , чтобы продолжить свои поиски.
      </p>
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
const props = defineProps({
  error: Object,
});
console.log(props.error);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.error404 {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3973aa;
  .content {
    width: 40%;
    color: $white;
    user-select: none;
  }
  .title {
    font-size: 200px;
    line-height: 250px;
    margin-bottom: 55px;
  }
  .text {
    font-size: 22px;
    line-height: 32px;
    margin-bottom: 50px;
  }
  .text2 {
    font-size: 13px;
    line-height: 16px;
    a {
      text-decoration: underline;
      color: $white;
    }
  }
}
</style>
