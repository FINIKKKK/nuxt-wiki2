<template>
  <NuxtLayout name="main" :nav="nav" :title="$t.title">
    <ul class="items_list">
      <li class="item index">
        <p>{{ $t.index.text }}</p>
        <NuxtLink :to="`${teamController.activeTeamSlug}/add_group`" class="btn"
          >{{ $t.index.btn }}
        </NuxtLink>
      </li>

      <li class="item" v-for="group in groups">
        <NuxtLink
          :to="`${teamController.activeTeamSlug}/groups/${group.id}`"
          class="title"
          >{{ group.name }}
        </NuxtLink>
        <ul class="info">
          <li class="info_item">
            <span> {{ $t?.users }}</span> {{ group.users.length }}
          </li>
        </ul>
      </li>
    </ul>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { TGroup } from '~/utils/types/group';

/**
 * Переменные ----------------
 */
const $t = await useTranslate('groups');
const route = useRoute();
const teamController = useTeamStore();
const nav = [
  { label: $t.nav.nav1, link: `${teamController.activeTeamSlug}/settings` },
  {
    label: $t.title,
    link: route.fullPath,
  },
];

/**
 * Получение данных ----------------
 */
// Группы
const { data: groups } = await useCustomFetch<TGroup[]>(`team/groups`, {
  query: { team_id: teamController.activeTeamId },
});
console.log(groups);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
