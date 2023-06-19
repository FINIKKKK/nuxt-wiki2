<template>
  <div class="main">
    <!-- Logo -->
    <NuxtLink to="/" class="logo">
      <img src="~/assets/img/svg/logo.svg" alt="logo" />
    </NuxtLink>

    <!-- Список навигации -->
    <div class="lists">
      <!--
        Верхний и нижний список
        + Если пользователь вошел
       -->
      <ul class="list" v-for="(itemsList, index) in items" :key="index">
        <!--
          Элемент навигации в списке
          + В зависимости от условия, показывать или скрывать
         -->
        <li
          v-for="(item, index) in itemsList"
          class="item"
          :class="{
            active: props.activeItem === item, // Если это активный элемент
            link: item === 'tooltip' || item === 'bell', // Если это ссылка
          }"
          :key="index"
          @click="setActiveItem(item)"
        >
          <!-- Если tooltip -->
          <a
            v-if="item === 'tooltip'"
            href="https://help.itl.wiki/public/section/30"
            target="_blank"
          >
            <svg-icon :name="item" />
          </a>

          <!-- Если уведомления -->
          <NuxtLink v-else-if="item === 'bell'" to="/notices">
            <svg-icon :name="item" />
          </NuxtLink>

          <!-- Иначе просто иконку -->
          <svg-icon v-else :name="item" />
        </li>
      </ul>
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
/**
 * Пропсы ----------------
 */
const props = defineProps<{
  activeItem: string | null;
}>();

/**
 * События ----------------
 */
const emits = defineEmits(['setActiveItem']);

/**
 * Пользовательские переменные ----------------
 */
// Массив элементов сайдбара
const items = [
  ['home', 'add', 'search'],
  ['settings', 'bell', 'tooltip', 'user'],
];

/**
 * Методы ----------------
 */
// Установить активный элемент в сайдбаре
const setActiveItem = (item: string) => {
  if (item !== 'tooltip') {
    emits('setActiveItem', item);
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.main {
  background-color: $blue;
  z-index: 40;
  padding: 32px 0 38px;
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    margin-bottom: 50px;
  }
}

.lists {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  .list {
    width: 100%;
  }
}

.item {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 24px;
  transition: 0.2s;
  &.link {
    padding: 0;
    a {
      padding: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  svg {
    width: 22px;
    height: 22px;
    fill: $white;
  }
  &:hover {
    background-color: darken($blue, 7%);
  }
  &.active {
    background-color: darken($blue, 7%);
  }
}
</style>
