<template>
  <main>
    <!-- Сайдбар -->
    <aside class="sidebar" ref="popupRef">
      <nav class="nav">
        <!-- Главный сайдбар -->
        <SidebarMain
          :activeItem="activeItem as string | null"
          @setActiveItem="setActiveItem"
        />

        <!-- Внутрениий сайдбар -->
        <!--        <SidebarPopup-->
        <!--            :isShow="isShowPopup as boolean"-->
        <!--            :activeItem="activeItem as string | null"-->
        <!--        />-->
      </nav>
    </aside>

    <!-- Остальной контент на странице -->
    <div
      id="scroll"
      class="content"
      :class="{
        miniTitle: props.isMiniTitle, // Если заголовок маленький
      }"
    >
      <!-- Заголовок -->
      <!-- Либо маленький -->
      <h4 class="pretitle" v-if="props.isMiniTitle">{{ props.title }}</h4>
      <!-- Либо большой -->
      <h1 class="title" v-else>
        <span>{{ props.title }}</span>
        <span v-if="title2">{{ props.title2 }}</span>
        <span v-if="title3">{{ props.title3 }}</span>
      </h1>

      <!-- Слот шаблона -->
      <slot />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useOutsideClick } from '~/hooks/useOutsideClick';
import SidebarMain from '~/componets/Sidebar/SidebarMain.vue';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  title?: string;
  title2?: string;
  title3?: string;
  isMiniTitle?: string;
}>();

/**
 * Системные переменные ----------------
 */
const config = useRuntimeConfig(); // Конфиг
const route = useRoute(); // Роут

/**
 * Вычислительные значения ----------------
 */

/**
 * Пользовательские переменные ----------------
 */
const popupRef = ref(null); // Ref-ссылка на элемент попапа
const isShowPopup = ref<boolean>(route.path.includes('/companies/') || true); // Показывать попап сайдара или нет
const activeItem = ref<string | null>(null); // Активный элемент в сайдаре

/**
 * Хуки ----------------
 */
// Скрывать попап, если нажатие было вне его области
// + Обнулять активный элемент
useOutsideClick(popupRef, isShowPopup, () => {
  activeItem.value = null;
});

/**
 * Методы ----------------
 */
// Выбрать элемент в сайдбаре
const setActiveItem = (item: string) => {
  // Если он уже активный, то обнуляем его и закрываем попап
  if (activeItem.value === item) {
    isShowPopup.value = false;
    activeItem.value = null;
  }
  // Иначе делаем его активный и открываем попап
  else {
    activeItem.value = item;
    isShowPopup.value = true;
  }
};
</script>

<style lang="scss" scoped>
main {
  position: relative;
  display: flex;
}

.sidebar {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .nav {
    display: flex;
    height: 100%;
  }
}

.content {
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 46px 36px;
  overflow: auto;
}

.title {
  font-size: 24px;
  margin-bottom: 60px;
  span:nth-child(1) {
    color: $black;
  }
  span:not(:last-child) {
    position: relative;
    padding-right: 32px;
    margin-right: 20px;
    &::after {
      //content: url('~/assets/img/arrow.svg');
      position: absolute;
      transform: translateY(-50%);
      top: 50%;
      right: 0;
    }
  }
}
</style>
