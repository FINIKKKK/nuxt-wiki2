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
import { ComputedRef } from 'vue';
import { useTranslate } from '~/hooks/useTranslate';

/**
 * Переменные ----------------
 */
const route = useRoute();
const router = useRouter();
const teamController = useTeamStore();
const userController = useUserStore();
const sidebarController = useSidebarStore();
const token = useCookie('token');
const $t = await useTranslate('sidebar');

/**
 * Методы ----------------
 */
// Выход из аккаунта
const onLogout = async () => {
  if (window.confirm($t.profile.logoutConfirm)) {
    const { message } = await useCustomFetch(`account/logout`, {
      method: 'POST',
    });
    if (message) {
      // Обнуляем токен
      token.value = '';
      // Удаляем информацию из хранилища
      userController.setUser(null);
      teamController.setTeams([]);
      // Перенаправляем пользователя на страницу авторизации
      await router.push('/login');
    }
  }
};

/**
 * Список элементов ----------------
 */
const innerItems: TInnerItem[] = [
  {
    name: 'home',
    title: $t.home.title,
    items: [
      {
        icon: 'compass',
        label: $t.home.activity,
        link: `${teamController.activeTeamSlug}`,
      },
      {
        icon: 'file-alt',
        label: $t.home.my,
        link: `${teamController.activeTeamSlug}/my_works`,
      },
      {
        icon: 'glasses',
        label: $t.home.moderation,
        link: `${teamController.activeTeamSlug}/moderation`,
        isShow:
          teamController.activeTeam?.role.name === 'owner' ||
          teamController.activeTeam?.role.name === 'moderator',
      },
    ],
  },
  {
    name: 'add',
    title: $t.add.title,
    items: [
      {
        icon: 'folder',
        label: $t.add.section,
        link: `${teamController.activeTeamSlug}/sections/create`,
      },
      {
        icon: 'file-alt',
        label: $t.add.article,
        link: `${teamController.activeTeamSlug}/articles/create`,
      },
    ],
  },
  {
    name: 'search',
    title: `Поиск по ${teamController.activeTeam?.team.name}.itl.wiki`,
  },
  {
    name: 'cog',
    title: $t.settings.title,
    items: [
      {
        icon: 'cog',
        label: $t.settings.general,
        link: `${teamController.activeTeamSlug}/settings`,
      },
      {
        icon: 'user',
        label: $t.settings.employees,
        link: `${teamController.activeTeamSlug}/settings/employees`,
      },
    ],
  },
  {
    name: 'user',
    title: $t.profile.title,
    items: [
      { icon: 'edit', label: $t.profile.edit, link: '/account' },
      {
        icon: 'bookmark',
        label: $t.profile.favorites,
        link: `/account/favorites`,
      },
      {
        icon: 'repeat-alt',
        label: $t.profile.changeTeam,
        link: '/',
        isShow: route.path !== '/',
      },
      { icon: 'sign-out-alt', label: $t.profile.logout, method: onLogout },
    ],
  },
];

/**
 * Вычисляемые значения ----------------
 */
// Активный элемент
const activeItem: ComputedRef<TInnerItem | null> = computed(() => {
  return (
    innerItems.find((obj) => obj.name === sidebarController.activeItem) || null
  );
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
