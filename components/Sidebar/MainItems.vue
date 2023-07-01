<template>
  <div class="items">
    <!-- Заголовок -->
    <h3 class="title">{{ activeItem?.title }}</h3>
    <!-- Список элементов -->
    <ul v-if="sidebarController.activeItem !== 'search' && activeItem?.items">
      <template v-for="(item, index) in activeItem?.items" :key="index">
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
import { useUserStore } from '~/stores/UserController';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TInnerItem } from '~/utils/types/sidebar';

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут
const router = useRouter(); // Роутер
const teamController = useTeamStore(); // Хранилище команд
const userController = useUserStore(); // Хранилище пользователя
const sidebarController = useSidebarStore(); // Хранилище сайдбара

/**
 * Пользовательские переменные ----------------
 */
const token = useCookie('token'); // Достаем токен из куки

/**
 * Методы ----------------
 */
// Выход из аккаунта
const onLogout = async () => {
  const { data } = await useCustomFetch(`account/logout`, {
    method: 'POST',
  });

  if (data.value) {
    // Обнуляем токен
    token.value = '';
    // Удаляем информацию из хранилища
    userController.setUser(null);
    teamController.setTeams([]);
    // Перенаправляем пользователя на страницу авторизации
    await router.push('/login');
  }
};

/**
 * Список элементов ----------------
 */
const innerItems: TInnerItem[] = [
  {
    name: 'home',
    title: 'Ваша компания',
    items: [
      {
        icon: 'activation',
        label: 'Активность',
        link: `${teamController.activeTeamId}`,
      },
      {
        icon: 'document',
        label: 'Ваши работы',
        link: `${teamController.activeTeamId}/my_works`,
      },
      {
        icon: 'glasses',
        label: 'На модерации',
        link: `${teamController.activeTeamId}/moderation`,
        isShow:
          teamController.activeTeam?.role.name === 'owner' ||
          teamController.activeTeam?.role.name === 'moderator',
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
        link: `${teamController.activeTeamId}/sections/create`,
      },
      {
        icon: 'document',
        label: 'Статью',
        link: `${teamController.activeTeamId}/articles/create`,
      },
    ],
  },
  {
    name: 'search',
    title: `Поиск по ${teamController.activeTeam?.name}.itl.wiki`,
  },
  {
    name: 'settings',
    title: 'Настройки',
    items: [
      {
        icon: 'settings',
        label: 'Общие',
        link: `${teamController.activeTeamId}/settings`,
      },
      {
        icon: 'user',
        label: 'Соотрудники',
        link: `${teamController.activeTeamId}/settings/employees`,
      },
      {
        icon: 'group',
        label: 'Группы',
        link: `${teamController.activeTeamId}/settings/employees`,
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
const activeItem: TInnerItem | null =
  innerItems.find((obj) => obj.name === sidebarController.activeItem) || null;
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
