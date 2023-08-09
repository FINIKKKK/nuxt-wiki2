<template>
  <NuxtLayout name="main" :title="$t.title">
    <ul class="items_list">
      <!-- Создать команду -->
      <li class="item index">
        <p>{{ $t?.createTeam.title }}</p>
        <NuxtLink to="/create_company" class="btn"
          >{{ $t?.createTeam.button }}
        </NuxtLink>
      </li>

      <!-- Команды -->
      <template v-for="team in data.teams" :key="team.id">
        <Team :data="team" />
      </template>

      <nuxt-link to="companies/75/sections/public/261">sections/public/261</nuxt-link>
    </ul>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TUserData } from '~/utils/types/account';
import { useTeamStore } from '~/stores/TeamContoller';

/**
 * Переменные ----------------
 */
const teamController = useTeamStore();
const $t = await useTranslate('teams');

/**
 * Получение данных ----------------
 */
// Команды пользователя
const { data } = await useCustomFetch<TUserData>(`/account`);
// Сохраняем в хранилище
teamController.setTeams(data.teams);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss"></style>
