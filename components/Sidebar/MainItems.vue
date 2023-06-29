<template>
  <div class="items">
    <!-- Заголовок -->
    <h3 class="title">{{ activeItem?.title }}</h3>
    <!-- Список элементов -->
    <ul v-if="sidebarController.activeItem !== 'search' && activeItem?.items">
      <template v-for="(item, index) in activeItem.items" :key="index">
        <SidebarItem
          v-if="item.hasOwnProperty('isShow') ? item.isShow : true"
          :data="item"
        />
      </template>
    </ul>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useSidebarStore } from '~/stores/SidebarController';
import { useTeamStore } from '~/stores/TeamContoller';
import { useHandleErrors } from '~/hooks/useHandleErrors';
import { Api } from '~/api';
import { useUserStore } from '~/stores/UserController';

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут
const router = useRouter(); // Роутер
const teamStore = useTeamStore(); // Хранилище активной компании
const userStore = useUserStore(); // Хранилище пользователя
const sidebarController = useSidebarStore(); // Хранилище сайдбара

/**
 * Пользовательские переменные ----------------
 */
const token = useCookie('token'); // Достаем токен из куки

/**
 * Хуки ----------------
 */
// Для обработки ошибок
const { handleSubmit } = useHandleErrors();

/**
 * Методы ----------------
 */
// Выход из аккаунта
const onLogout = async () => {
  // Вызываем хук для обработки ошибок
  handleSubmit(async () => {
    // Выходим с аккаунта
    await Api().account.logout();
    // Обнуляем токен
    token.value = '';
    // Удаляем информацию из хранилища
    userStore.setUser(null);
    userStore.setTeams([]);
    // Перенаправляем пользователя на страницу авторизации
    await router.push('/login');
  });
};

/**
 * Список элементов ----------------
 */
const innerItems = [
  {
    name: 'home',
    title: 'Ваша компания',
    items: [
      {
        icon: 'activation',
        label: 'Активность',
        link: `${teamStore.activeTeamId}`,
      },
      {
        icon: 'document',
        label: 'Ваши работы',
        link: `${teamStore.activeTeamId}/my_works`,
      },
      {
        icon: 'glasses',
        label: 'На модерации',
        link: `${teamStore.activeTeamId}/moderation`,
        isShow:
          teamStore.activeTeam?.role.name === 'owner' ||
          teamStore.activeTeam?.role.name === 'moderator',
      },
      {
        icon: 'favorite',
        label: 'Закладки',
        link: `/account/favorites`,
      },
    ],
  },
  {
    name: 'add',
    title: 'Создать',
    items: [
      {
        icon: 'folder',
        label: 'Раздел',
        link: `${teamStore.activeTeamId}/sections/create`,
      },
      {
        icon: 'document',
        label: 'Статью',
        link: `${teamStore.activeTeamId}/articles/create`,
      },
    ],
  },
  {
    name: 'search',
    title: `Поиск по ${teamStore.activeTeam?.name}.itl.wiki`,
  },
  {
    name: 'settings',
    title: 'Настройки',
    items: [
      {
        icon: 'settings',
        label: 'Общие',
        link: `${teamStore.activeTeamId}/settings`,
      },
      {
        icon: 'user',
        label: 'Соотрудники',
        link: `${teamStore.activeTeamId}/settings/employees`,
      },
      {
        icon: 'group',
        label: 'Группы',
        link: `${teamStore.activeTeamId}/settings/employees`,
      },
    ],
  },
  {
    name: 'user',
    title: 'Профиль',
    items: [
      { icon: 'edit', label: 'Редактировать', link: '/account/profile' },
      {
        icon: 'change',
        label: 'Сменить компанию',
        link: '/',
        isShow: route.path !== '/',
      },
      { icon: 'logout', label: 'Выйти', method: onLogout },
    ],
  },
];

/**
 * Вычисляемые значения ----------------
 */
// Активный элемент
const activeItem = computed(() => {
  return innerItems.find((obj) => obj.name === sidebarController.activeItem);
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.items {
  margin-bottom: 25px;
}

.title {
  font-size: 20px;
  line-height: 23px;
  margin-bottom: 30px;
}
</style>
