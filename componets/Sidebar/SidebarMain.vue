<template>
  <div class="main">
    <!-- Logo -->
    <NuxtLink to="/" class="logo">
      <img src="~/assets/img/logo.svg" alt="logo"/>
    </NuxtLink>

    <!-- Список навигации -->
    <div class="lists">
      <!--
        Верхний и нижний список
        + Если пользователь вошел
       -->
      <ul
          class="list"
          v-for="(itemsList, index) in items"
          :key="index"
      >
        <!--
          Элемент навигации в списке
          + В зависимости от условия, показывать или скрывать
         -->
        <li
            v-for="(item, index) in itemsList"
            class="item"
            :class="{
            active: props.activeItem === item, // Если это активный элемент
            link: isTooltip(item), // Если это ссылка
          }"
            :key="index"
            @click="setActiveItem(item)"
        >
          <!-- Если это tooltip, то показывать ссылку -->
          <a
              v-if="isTooltip(item)"
              href="https://help.itl.wiki/public/section/30"
              target="_blank"
          >
            <svg-icon :name="item"/>
          </a>

          <!-- Иначе просто иконку -->
          <svg-icon v-else :name="item"/>
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
 * Системные переменные ----------------
 */
const config = useRuntimeConfig(); // Конфиг
const route = useRoute(); // Роут

/**
 * Пользовательские переменные ----------------
 */
// Массив элементов сайдбара
const items = [
  ['home', 'add', 'search'],
  ['settings', 'bell', 'tooltip', 'user']
]

/**
 * Вычисляемые значения ----------------
 */
// Если элемент это tooltip
const isTooltip = computed(
    () => (item: string) => item === 'tooltip',
);

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
    background-color: $blue2;
  }
  &.active {
    background-color: $blue2;
  }
}
</style>
