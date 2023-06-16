<template>
  <NuxtLayout name="main" title="Ваши wiki" v-if="teams">
    <ul class="teams">
      <!-- Создать команду -->
      <li class="team index">
        <p>
          Создайте wiki и Вовлекайте сотрудников в процесс непрерывного обмена
          знаниями и опытом.
        </p>
        <NuxtLink to="/create_company" class="btn">Создать компанию</NuxtLink>
      </li>

      <!-- Команды -->
      <li class="team" v-for="team in teams" :key="team.id">
        <NuxtLink to="/" class="title">{{ team.name }}</NuxtLink>
        <ul class="info">
          <li class="info__item"><span>План:</span> {{ team.plan.name }}</li>
          <li class="info__item">
            <span>Пользователи:</span> {{ team.employees_count }}
          </li>
          <li class="info__item">
            <span>Адресс:</span> {{ team.code }}.wiki.itl.systems
          </li>
        </ul>
        <span class="notices" v-if="team.unread_notification">{{
          team.unread_notification
        }}</span>
      </li>
    </ul>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useUserStore } from '~/stores/UserStore';
import { Api } from '~/api';

/**
 * Системные переменные ----------------
 */
const userStore = useUserStore(); // Хранилище данных пользователя

/**
 * Получение данных ----------------
 */
// Команды пользователя
const { data: teams } = await useAsyncData(async () => {
  const { data } = await Api().account.me();
  userStore.setTeams(data.teams);
  return data.teams;
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
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
