<template>
  <!--------------------------------------
  Основные разделы
  ---------------------------------------->
  <template
    v-if="!(route.path.includes('/sections') || route.path.includes('/posts'))"
  >
    <div class="items" v-if="sections?.length">
      <h3>Разделы</h3>
      <ul>
        <template v-for="section in sections" :key="section.id">
          <SidebarItem :data="section" type="section" />
        </template>
      </ul>
    </div>
  </template>

  <!--------------------------------------
  Разделы и посты внутри раздела
  ---------------------------------------->
  <template v-else>
    <!-- Кнопки в шапке -->
    <div class="header">
      <div class="back">
        <svg-icon name="back" />
        <p>Назад</p>
      </div>
      <svg-icon
        :name="sectionsStore.isActiveHamburger ? 'close' : 'hamburger'"
        class="hamburger"
        @click="sectionsStore.setActiveHamburger"
      />
    </div>

    <!-- Разделы -->
    <div class="items" v-if="!sectionsStore.isActiveHamburger">
      <h3 class="title">{{ sectionsStore.section.name }}</h3>
      <ul>
        <template
          v-for="section in sectionsStore.section.child"
          :key="section.id"
        >
          <SidebarItem :data="section" type="section" />
        </template>
      </ul>
    </div>

    <!-- Посты -->
    <!--    <div class="items" v-if="sectionItemsStore.posts?.length">-->
    <!--      <h3>Статьи</h3>-->
    <!--      <ul>-->
    <!--        <template v-for="post in sectionItemsStore.posts" :key="post.id">-->
    <!--          <SidebarItem :data="post" type="post" />-->
    <!--        </template>-->
    <!--      </ul>-->
    <!--    </div>-->

    <ul class="map" v-else>
      <li v-for="item in sections" class="item">
        <NuxtLink :to="`${teamStore.activeTeamId}/sections/${item.id}`"
          >{{ item.name }}
        </NuxtLink>
        <ul class="children">
          <li v-for="child in item.children" class="child">
            <NuxtLink :to="`${teamStore.activeTeamId}/sections/${item.id}`"
              >{{ child.name }}
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </template>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { Api } from '~/api';
import { useTeamStore } from '~/stores/TeamStore';
import { useSectionsStore } from '~/stores/SectionStore';

/**
 * События ----------------
 */
const emits = defineEmits(['setActiveHamburger']);

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут
const sectionsStore = useSectionsStore(); // Хранилище разделов активной компании
const teamStore = useTeamStore(); // Хранилище активной команды

/**
 * Получение данных ----------------
 */
// Список основных разделов
const { data: sections } = useAsyncData(async () => {
  if (route.path.includes('/companies')) {
    const { data } = await Api().section.getAll(teamStore.activeTeam?.team.id);
    sectionsStore.setSections(data);
    return data;
  }
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.items {
  margin-bottom: 49px;
  .title {
    color: $black;
    text-transform: none;
    font-size: 20px;
    line-height: 23px;
    margin-bottom: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  h3 {
    text-transform: uppercase;
    color: $gray;
    margin-bottom: 18px;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid rgba($black, 0.1);
  margin: -40px -50px 40px;
  .back {
    display: flex;
    align-items: center;
  }
  svg {
    width: 15px;
    height: 15px;
  }
  .back {
    cursor: pointer;
    p {
      margin-left: 10px;
      transition: 0.3s;
      font-size: 14px;
    }
    &:hover {
      p {
        color: $blue;
      }
    }
  }
  .hamburger {
    cursor: pointer;
  }
}

.map {
  .item,
  .child {
    &:not(:last-child) {
      margin-bottom: 15px;
    }
  }
  .children {
    margin-top: 15px;
    padding-left: 25px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      width: 1px;
      height: 100%;
      top: 0;
      left: 7px;
      background-color: rgba($black, 0.2);
    }
  }
  a {
    color: $gray;
    &:hover {
      text-decoration: none;
      color: $blue;
    }
  }
}
</style>
