<template>
  <div class="main">
    <!-- Logo -->
    <NuxtLink to="/" class="logo">
      <img src="~/assets/img/logo.svg" alt="logo" />
    </NuxtLink>

    <!-- Список навигации -->
    <div class="lists" v-if="userController.user">
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
            <i class="fa-regular fa-question-circle"></i>
          </a>

          <!-- Если уведомления -->
          <NuxtLink
            v-else-if="item === 'bell'"
            :to="`${teamController.activeTeamSlug}/notices`"
          >
            <i class="fa-regular fa-bell"></i>
          </NuxtLink>

          <!-- Иначе просто иконку -->
          <i v-else :class="`fa-regular fa-${item}`"></i>
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

/**
 * Переменные ----------------
 */
const route = useRoute();
const userController = useUserStore();
const teamController = useTeamStore();
const sidebarController = useSidebarStore();
const items = [
  ['home', 'add', 'search'],
  ['cog', 'bell', 'tooltip', 'user'],
];

/**
 * Вычисляемые значения ----------------
 */
// Показываеть элемент сайдбара
const isShowItem = computed(() => (item: string) => {
  // Получаем роль пользователя в компании
  const role = teamController.activeTeam?.role.name;
  // Если есть активная компания, то показываем только tooltip и профиль
  return (
    teamController.activeTeam ||
    item === 'tooltip' ||
    item === 'user' ||
    item === 'cog'
  );
});
// Показывать ли элементы?
const isShow = computed(
  () =>
    sidebarController.activeItem === 'home' &&
    (route.path.includes('/sections') || route.path.includes('/articles')),
);
// Изначальный текущий компонент
onMounted(() => {
  if (isShow.value) {
    sidebarController.changeComponent('SidebarExtraItems');
    sidebarController.closeMap();
  } else {
    sidebarController.closeMap();
    sidebarController.changeComponent('SidebarMainItems');
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
      sidebarController.closeMap();
      // Меняем resolveComponent в зависимости от условия
      if (isShow.value) {
        sidebarController.changeComponent('SidebarExtraItems');
      } else if (item === 'search') {
        sidebarController.changeComponent('SidebarSearch');
      } else {
        sidebarController.changeComponent('SidebarMainItems');
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
      text-decoration: none;
    }
  }
  .fa-regular {
    font-size: 20px;
    color: $white;
  }
  &:hover {
    background-color: darken($blue, 7%);
  }
  &.active {
    background-color: darken($blue, 7%);
  }
}
</style>
