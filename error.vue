<template>
  <div class="error404">
    <div class="content">
      <h1 class="title" :data-shadow="error.statusCode">
        {{ error.statusCode }}
      </h1>
      <p class="text" v-if="message">
        {{ message }}
      </p>
      <NuxtLink to="/" class="btn">
        <i class="fa-regular fa-arrow-left" />
        <p>{{ $t.home }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
/**
 * Пропсы ----------------
 */
import { TError404 } from '~/utils/types/base';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  error: TError404;
}>();
console.log(props.error);

/**
 * Переменные ----------------
 */
const $t = await useTranslate('error404');

/**
 * Вычисляемое ----------------
 */
// Сообщение ошибки
const message = computed(() => {
  if (props.error.statusCode === 404) {
    return $t.messages.error404;
  } else if (props.error.statusCode === 500) {
    return $t.messages.error500;
  } else if (props.error.statusCode === 403) {
    return $t.messages.error403;
  } else return null;
});
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
  text-align: center;
  .content {
    width: 50%;
    color: $white;
    user-select: none;
  }
  .title {
    font-size: 300px;
    line-height: 250px;
    margin-bottom: 55px;
    display: inline-block;
    color: $blue;
    text-shadow: 0.03em 0.03em 0 $bg;
    position: relative;
    &:after {
      content: attr(data-shadow);
      position: absolute;
      top: 0.06em;
      left: 0.06em;
      z-index: -1;
      text-shadow: none;
      background-image: linear-gradient(
        45deg,
        transparent 45%,
        $blue 45%,
        $blue 55%,
        transparent 0
      );
      background-size: 0.05em 0.05em;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shad-anim 15s linear infinite;
    }
  }
  .text {
    line-height: 28px;
    margin-bottom: 50px;
    color: $blue;
  }
  .btn {
    text-decoration: none;
    color: $white;
    background-color: $blue;
    padding: 10px 35px;
    font-size: 14px !important;
    border-radius: 25px;
    display: inline-flex;
    align-items: center;
    i {
      color: $white;
      margin-right: 15px;
    }
    &:hover {
      transform: scale(1.03);
    }
  }
}

@keyframes shad-anim {
  0% {
    background-position: 0 0;
  }
  0% {
    background-position: 100% -100%;
  }
}
</style>
