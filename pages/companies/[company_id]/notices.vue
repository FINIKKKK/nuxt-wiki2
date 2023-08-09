<template>
  <NuxtLayout name="main" :title="$t.title" :nav="nav">
    <!--------------------------------------
     Табдица
    ---------------------------------------->
    <table class="table" v-if="notificationsList.length">
      <thead>
        <tr>
          <th>{{ $t.user }}</th>
          <th>{{ $t.action }}</th>
          <th>{{ $t?.date }}</th>
          <th>{{ $t.status }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="notice in notificationsList"
          class="notice"
          :key="notice.id"
          v-observe="() => addNotice(notice.id)"
        >
          <th>
            <User :data="notice.to" class="user" />
          </th>

          <th>
            <NuxtLink
              :to="`${teamController.activeTeamSlug}/sections/${notice.entity.section_id}`"
              >{{ noticeMessage(notice.params.message) }}
            </NuxtLink>
          </th>
          <th>{{ useFormatDate(notice.created_at, userController.lang) }}</th>
          <th class="status">
            <p v-if="notice.read_at">{{ $t?.status_read }}</p>
            {{
              notice.read_at
                ? useFormatDate(notice.read_at, userController.lang)
                : $t?.status_unread
            }}
          </th>
        </tr>
      </tbody>
    </table>

    <!-- Сообщение, если нету элементов -->
    <p v-else>{{ $t?.no_notices }}</p>

    <!-- Loading -->
    <LoadingTableItem
      v-if="requestController.loading[url]"
      v-for="(item, index) in Array(10)"
      :key="index"
      :count="4"
    />

    <div v-observe="() => getNotices()"></div>
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
import { useUserStore } from '~/stores/UserController';
import { useDebounce } from '~/hooks/useDebounce';

/**
 * Переменные ----------------
 */
const url = 'account/notifications';
const route = useRoute();
const teamController = useTeamStore();
const $t = await useTranslate('notices');
const nav = [{ label: $t.title, link: route.path }];
const requestController = useRequestStore();
const notificationsList = ref<TNotice[]>([]);
const userController = useUserStore();
const readNotices = ref<number[]>([]);

/**
 * Получение данных ----------------
 */
// Список уведомлений
const { data: notifications } = await useCustomFetch<TNotifications>(url, {
  query: { team_id: teamController.activeTeamId, limit: 15, offset: 0 },
});
notificationsList.value.push(...notifications.notifications);

/**
 * Вычисляемое ----------------
 */
// Сообщение уведомления
const noticeMessage = computed(() => (message: string) => {
  if (message === 'Your article has been published')
    return $t.messages.article_publish;
  else if (message === 'Added comment') return $t.messages.add_comment;
  else if (message === 'Your article has been submitted for review')
    return $t.messages.article_moder;
});

/**
 * Методы ----------------
 */
// Получение новых уведомлений
let isEnd = false;
const getNotices = async () => {
  if (!isEnd) {
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

    if (!newNotifications.notifications.length) {
      isEnd = true;
    }

    notificationsList.value = [
      ...notificationsList.value,
      ...newNotifications.notifications,
    ];
  }
};

// Отправить запрос, чтобы прочитать уведомления
const onReadNotices = useDebounce(async () => {
  if (readNotices.value.length) {
    await useCustomFetch(`account/notifications/read`, {
      body: { notifications: readNotices.value },
      method: 'POST',
    });
    readNotices.value = [];
  }
}, 500);

// Прочитать уведомления
const addNotice = (id: number) => {
  const notice = notificationsList.value.find((obj: TNotice) => obj.id === id);

  if (!notice?.read_at) {
    readNotices.value.push(id);
    notice.read_at = new Date().toString();
    onReadNotices();
  }
};
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
  .status {
    p {
      color: $gray;
      font-size: 12px;
      line-height: 14px;
    }
  }
}
</style>
