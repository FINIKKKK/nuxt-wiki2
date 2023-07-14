<template>
  <NuxtLayout name="main" :title="$t.title" :nav="nav">
    <table class="table">
      <thead>
        <tr>
          <th>Пользователь</th>
          <th>Действие</th>
          <th>Дата</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="notice in notifications.notifications" class="notice">
          <th>
            <User :data="notice.to" class="user" />
          </th>
          <th>{{ notice.params.message }}</th>
          <th>{{ useFormatDate(notice.created_at) }}</th>
          <th>{{ notice.read_at ? 'Прочитано' : 'Не прочитано' }}</th>
        </tr>
      </tbody>
    </table>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTranslate } from '~/hooks/useTranslate';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { TNotifications } from '~/utils/types/notice';
import { useFormatDate } from '~/hooks/useFormatData';

/**
 * Переменные ----------------
 */
const route = useRoute();
const teamController = useTeamStore();
const $t = await useTranslate('notices');
const nav = [{ label: $t.title, link: route.path }];

//
const { data: notifications } = await useCustomFetch<TNotifications>(
  `account/notifications`,
  {
    query: { team_id: teamController.activeTeamId },
  },
);
console.log(notifications);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.notice {
  height: 64px;
  transition: 0.2s;
  .user {
    pointer-events: none;
    padding: 0 !important;
  }
  th {
    padding: 7px 16px;
    vertical-align: middle;
  }
  &:hover {
    background-color: $bg;
  }
}
</style>
