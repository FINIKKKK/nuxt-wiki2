<template>
  <div
    class="sidebar__popup"
    :class="{
      active: isShow && activeItem, // Если sidebar открыт
      search: activeItem === 'search', // Если открыт поиск
    }"
  >
    <div class="inner">
      <!--------------------------------------
      Основные элементы активной группы
      ---------------------------------------->
      <div
        class="main"
        v-if="
          activeItem !== 'home' ||
          (!route.path.includes('/sections') && !route.path.includes('/posts'))
        "
      >
        <h3 class="title">
          {{ innerItems.find((obj) => obj.name === activeItem)?.title }}
        </h3>
        <ul
          v-if="
            activeItem !== 'search' &&
            innerItems.find((obj) => obj.name === activeItem)?.items
          "
        >
          <template
            v-for="(item, index) in innerItems.find(
              (obj) => obj.name === activeItem,
            ).items"
            :key="index"
          >
            <SidebarItem :data="item" />
          </template>
        </ul>

        <!--------------------------------------
        Поиск
        ---------------------------------------->
        <SidebarSearch :activeItem="activeItem" />
      </div>

      <!--------------------------------------
      Дополнительные элементы
      ---------------------------------------->
      <!--      <SidebarItems v-if="activeItem === 'home'" />-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Api } from '~/api';
import { useUserStore } from '~/stores/UserStore';
import Input from '~/components/UI/Input.vue';
import SidebarSearch from '~/componets/Sidebar/SidebarSearch.vue';
import SidebarItem from '~/componets/Sidebar/SidebarItem.vue';

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
const config = useRuntimeConfig(); // Конфиг
const route = useRoute(); // Роут
const router = useRouter(); // Роутер
const userStore = useUserStore(); // Хранилище пользователя
// const companyStore = useCompanyStore(); // Хранилище активной компании

/**
 * Пользовательские переменные ----------------
 */
const token = useCookie('token'); // Достаем токен из куки

/**
 * Хуки ----------------
 */
// Для обработки ошибок
// const { handleSubmit } = useHandleErrors();

/**
 * Методы ----------------
 */
// Выход из аккаунта
const onLogout = async () => {
  // Вызываем хук для обработки ошибок
  // handleSubmit(async () => {
  //   await Api().auth.logout(); // Выходим с аккаунта
  //   token.value = ''; // Обнуляем токен
  //   // Удаляем информацию из хранилища
  //   userStore.user = null;
  //   userStore.companies = [];
  //   // Перенаправляем пользователя на страницу авторизации
  //   await router.push('/login');
  // });
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
        // link: `${companyStore.activeCompanySlug}`,
      },
      {
        icon: 'document',
        label: 'Ваши работы',
        // link: `${companyStore.activeCompanySlug}/my_works`,
      },
      {
        icon: 'glasses',
        label: 'На модерации',
        // link: `${companyStore.activeCompanySlug}/moderation`,
        // isShow: companyStore.activeCompany?.pivot.role_id === 1,
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
        // link: `${companyStore.activeCompanySlug}/sections/create`,
      },
      {
        icon: 'document',
        label: 'Статью',
        // link: `${companyStore.activeCompanySlug}/posts/create`,
      },
    ],
  },
  {
    name: 'search',
    // title: `Поиск по ${companyStore.activeCompany?.name}.itl.wiki`,
  },
  {
    name: 'settings',
    title: 'Настройки',
    items: [
      {
        icon: 'settings',
        label: 'Общие',
        // link: `${companyStore.activeCompanySlug}/settings/general`,
      },
      {
        icon: 'user',
        label: 'Соотрудники',
        // link: `${companyStore.activeCompanySlug}/settings/employees`,
      },
    ],
  },
  {
    name: 'user',
    title: 'Профиль',
    items: [
      { icon: 'favorite', label: 'Закладки', link: '/account/favorites' },
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
