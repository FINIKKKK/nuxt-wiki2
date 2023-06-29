<template>
  <!--------------------------------------
  Разделы и посты внутри раздела
  ---------------------------------------->
  <template v-if="!sidebarController.isActiveMap">
    <!-- Разделы -->
    <div class="items">
      <h3 class="title">{{ sidebarController.section.name }}</h3>
      <ul>
        <template
          v-for="section in sidebarController.section.child"
          :key="section.id"
        >
          <SidebarItem :data="section" type="section" />
        </template>
      </ul>
    </div>

    <!-- Посты -->
    <div class="items" v-if="sidebarController.section.items?.length">
      <h3>Статьи</h3>
      <ul>
        <template
          v-for="article in sidebarController.section.items"
          :key="article.id"
        >
          <SidebarItem :data="article" type="article" />
        </template>
      </ul>
    </div>
  </template>


</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useSidebarStore } from '~/stores/SidebarController';

/**
 * Системные переменные ----------------
 */
const sidebarController = useSidebarStore(); // Хранилище сайдбара
const teamStore = useTeamStore(); // Хранилище активной команды
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
