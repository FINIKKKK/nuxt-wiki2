<template>
  <div class="main">
    <!-- Logo -->
    <NuxtLink to="/" class="logo">
      <img src="~/assets/img/svg/logo.svg" alt="logo" />
    </NuxtLink>

    <!-- Список навигации -->
    <div class="lists" v-if="userStore.user">
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
          v-show="isShowItem(item)"
          class="item"
          :class="{
            active: sidebarController.activeItem === item, // Если это активный элемент
            link: item === 'tooltip' || item === 'bell', // Если это ссылка
          }"
          :key="index"
          @click="openSidebar(item)"
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
import { useTeamStore } from '~/stores/TeamContoller';
import { useUserStore } from '~/stores/UserController';
import { useSidebarStore } from '~/stores/SidebarController';
import { TComponentItem } from '~/utils/types/base';

/**
 * Системные переменные ----------------
 */
const userStore = useUserStore(); // Хранилище данных пользователя
const teamStore = useTeamStore(); // Хранилище активной команды
const sidebarController = useSidebarStore(); // Хранилище сайдбара

/**
 * Пользовательские переменные ----------------
 */
// Массив элементов сайдбара
const items = [
  ['home', 'add', 'search'],
  ['settings', 'bell', 'tooltip', 'user'],
];
// Компоненты для resolveComponent
const components: TComponentItem = {
  SidebarMainItems: resolveComponent('SidebarMainItems'),
  SidebarSearch: resolveComponent('SidebarSearch'),
  SidebarMap: resolveComponent('SidebarMap'),
};

/**
 * Вычисляемые значения ----------------
 */
// Показываеть элемент сайдбара
const isShowItem = computed(() => (item: string) => {
  // Получаем роль пользователя в компании
  const role = teamStore.activeTeam?.role.name;
  // Если есть активная компания, то показываем только tooltip и профиль
  if (
    teamStore.activeTeam ||
    item === 'tooltip' ||
    item === 'user' ||
    item === 'bell'
  ) {
    // Если роль - модератор
    if (role === 'owner') {
      // Показываем всё
      return true;
    }
    // Иначе
    // Не показываем только настройки
    else return item !== 'settings';
  }
});

/**
 * Методы ----------------
 */
// Открываем сайдбар
const openSidebar = (item: string) => {
  if (item !== 'tooltip') {
    // Если он уже активный, то обнуляем его и закрываем попап
    if (sidebarController.activeItem === item) {
      sidebarController.close();
    }
    // Иначе делаем его активный и открываем попап
    else {
      sidebarController.open(item);
      // Меняем resolveComponent в зависимости от условия
      if (item !== 'search') {
        sidebarController.changeComponent(components['SidebarMainItems']);
      } else {
        sidebarController.changeComponent(components['SidebarSearch']);
      }
    }
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
