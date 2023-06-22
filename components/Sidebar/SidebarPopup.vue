<template>
  <div
    class="sidebar__popup"
    :class="{
      active: props.isShow && props.activeItem, // Если sidebar открыт
      search: props.activeItem === 'search', // Если открыт поиск
    }"
  >
    <div class="inner">
      <!--------------------------------------
      Основные элементы активной группы
      ---------------------------------------->
      <div
        class="main"
        v-if="
          props.activeItem !== 'home' ||
          (!route.path.includes('/sections') && !route.path.includes('/posts'))
        "
      >
        <h3 class="title">
          {{ innerItems.find((obj) => obj.name === props.activeItem)?.title }}
        </h3>
        <ul
          v-if="
            props.activeItem !== 'search' &&
            innerItems.find((obj) => obj.name === props.activeItem)?.items
          "
        >
          <template
            v-for="(item, index) in innerItems.find(
              (obj) => obj.name === props.activeItem,
            ).items"
            :key="index"
          >
            <SidebarItem
              v-if="item.hasOwnProperty('isShow') ? item.isShow : true"
              :data="item"
            />
          </template>
        </ul>

        <!--------------------------------------
        Поиск
        ---------------------------------------->
        <SidebarSearch :activeItem="props.activeItem" />
      </div>

      <!--------------------------------------
      Дополнительные элементы
      ---------------------------------------->
      <SidebarItems v-if="activeItem === 'home'" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Api } from '~/api';
import { useUserStore } from '~/stores/UserStore';
import Input from '~/components/UI/Input.vue';
import SidebarSearch from '~/components/Sidebar/SidebarSearch.vue';
import SidebarItem from '~/components/Sidebar/SidebarItem.vue';
import { useHandleErrors } from '~/hooks/useHandleErrors';
import { useTeamStore } from '~/stores/TeamStore';
import { useSectionsStore } from '~/stores/SectionStore';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  isShow: boolean;
  activeItem: string | null;
}>();

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут
const router = useRouter(); // Роутер
const userStore = useUserStore(); // Хранилище пользователя
const teamStore = useTeamStore(); // Хранилище активной компании
const sectionsStore = useSectionsStore(); // Хранилище

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
    userStore.user = null;
    userStore.teams = [];
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
</script>

<style lang="scss" scoped>
.sidebar__popup {
  position: relative;
  user-select: none;
  white-space: nowrap;
  z-index: 30;
  width: 0px;
  opacity: 1;
  background-color: $bg;
  transition: 0.3s;
  transform: translateX(-100%);
  pointer-events: none;
  box-shadow: 0 0 10px rgba($blue, 0.2);
  .inner {
    padding: 41px 50px;
    opacity: 0;
    transition: 0.3s;
  }
  .title {
    font-size: 20px;
    line-height: 23px;
    margin-bottom: 30px;
  }
  &.active {
    width: 300px;
    transform: translateX(0px);
    pointer-events: visible;
    .inner {
      opacity: 1;
    }
  }
}

.sidebar__popup.search {
  width: 550px;
  .input {
    input {
      font-size: 16px;
    }
  }
}

.main {
  margin-bottom: 46px;
}

.items {
  margin-bottom: 49px;
  h3 {
    text-transform: uppercase;
    color: $gray;
    margin-bottom: 18px;
  }
}
</style>
