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
        <tr v-for="notice in notificationsList" class="notice">
          <th>
            <User :data="notice.to" class="user" />
          </th>
          <th>{{ notice.params.message }}</th>
          <th>{{ useFormatDate(notice.created_at, userController.lang) }}</th>
          <th>{{ notice.read_at ? 'Прочитано' : 'Не прочитано' }}</th>
        </tr>
      </tbody>
    </table>
    <LoadingTableItem
      v-if="requestController.loading[url]"
      v-for="(item, index) in Array(10)"
      :key="index"
    />
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { TNotice, TNotifications } from '~/utils/types/notice';
import { useFormatDate } from '~/hooks/useFormatData';
import { useRequestStore } from '~/stores/RequestController';
import { useSidebarStore } from '~/stores/SidebarController';
import { useUserStore } from '~/stores/UserController';

/**
 * Переменные ----------------
 */
const url = 'account/notifications';
const route = useRoute();
const teamController = useTeamStore();
const $t = await useTranslate('notices');
const nav = [{ label: $t.title, link: route.path }];
const requestController = useRequestStore();
const sidebarController = useSidebarStore();
const notificationsList = ref<TNotice[]>([]);
const userController = useUserStore();

/**
 * Получение данных ----------------
 */
// Список уведомлений
const { data: notifications } = await useCustomFetch<TNotifications>(url, {
  query: { team_id: teamController.activeTeamId, limit: 15, offset: 0 },
});
console.log(notifications);
notificationsList.value.push(...notifications.notifications);

/**
 * Вычисляемое ----------------
 */
// При скролле добавляю новые уведомления
watch(
  () => sidebarController.isEndScrollPage,
  async () => {
    if (sidebarController.isEndScrollPage) {
      const { data: newNotifications } = await useCustomFetch<TNotifications>(
        url,
        {
          query: {
            team_id: teamController.activeTeamId,
            limit: 15,
            offset: notificationsList.value.length,
          },
        },
      );
      notificationsList.value = [
        ...notificationsList.value,
        ...newNotifications.notifications,
      ];
      console.log(notifications.length);
      console.log(notificationsList.value);
    }
  },
);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.table {
  overflow: hidden;
  thead {
    position: relative;
    z-index: 20;
  }
  tbody {
    position: relative;
    z-index: 10;
  }
}

.notice {
  height: 64px;
  transition: 0.2s;
  .user {
    pointer-events: none;
    padding: 0 !important;
  }
  th {
    padding: 7px 10px;
    vertical-align: middle;
  }
  &:hover {
    background-color: $bg;
  }
}
</style>
