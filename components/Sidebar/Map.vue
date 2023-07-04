<template>
  <ul class="map">
    <li
      v-for="item in sectionsController.sections"
      class="item"
      :class="{ active: Number(route.params.id) === item.id }"
    >
      <NuxtLink class="link" :to="`${teamStore.activeTeamSlug}/sections/${item.id}`"
        >{{ item.name }}
      </NuxtLink>
      <ul class="children">
        <li v-for="child in item.children" class="child" :class="{ active: Number(route.params.id) === child.id }">
          <NuxtLink :to="`${teamStore.activeTeamSlug}/sections/${child.id}`"
            >{{ child.name }}
          </NuxtLink>
        </li>
      </ul>
    </li>
  </ul>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useSidebarStore } from '~/stores/SidebarController';
import {useSectionsStore} from "~/stores/SectionContoller";

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут
const sectionsController = useSectionsStore(); // Хранилище сайдбара
const teamStore = useTeamStore(); // Хранилище активной команды
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.map {
  .item,
  .child {
    &:not(:last-child) {
      margin-bottom: 15px;
    }
    &.active .link {
      color: $blue;
    }
  }
  .child.active {
    a {
      color: $blue;
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