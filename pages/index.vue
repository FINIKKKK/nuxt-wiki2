<template>
  <NuxtLayout name="main" :title="$t.title">
    <ul class="teams">
      <!-- Создать команду -->
      <li class="team index">
        <p>{{ $t.createTeam.title }}</p>
        <NuxtLink to="/create_company" class="btn"
          >{{ $t.createTeam.button }}
        </NuxtLink>
      </li>

      <!-- Команды -->
      <template v-for="team in data.teams" :key="team.id">
        <Team :data="team" />
      </template>
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

<style lang="scss">
.teams {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -24px -48px;
}

.team {
  margin: 0 24px 48px;
  width: 405px;
  height: 220px;
  position: relative;
  padding: 32px;
  background-color: $white;
  box-shadow: 0 0 5px rgba($blue, 0.2);
  border-radius: 5px;
  .title {
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 16px;
    color: $blue;
  }
  .info {
    li {
      span {
        color: $gray;
      }
    }
  }
  .notices {
    position: absolute;
    top: -10px;
    right: -10px;
    border-radius: 50%;
    background-color: $blue;
    color: $white;
    font-size: 13px;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &.index {
    p {
      margin-bottom: 25px;
    }
    .btn {
      width: 100%;
    }
  }
}
</style>
