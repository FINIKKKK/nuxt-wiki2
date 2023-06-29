<template>
  <ul class="map">
    <li v-for="item in sidebarController.sections" class="item">
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

<style lang="scss" scoped></style>
