<template>
  <NuxtLayout name="main" :nav="nav" :title="group.name">
    <!-- Warning -->
    <UIWarning
      v-if="groupController.successMessage"
      :message="groupController.successMessage"
      class="warning"
    />

    <!-- Поиск и кнопка добавления новых пользователей -->
    <GroupPageField />

    <!-- Таблица соотрудников -->
    <GroupPageTable v-if="groupController.users" />

    <!-- Попап добавления новых пользователей -->
    <PopupAddUsers2
      :isOpen="groupController.isOpenAddUsers"
      @close="groupController.closeAddUsers()"
    />
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useGroupStore } from '~/stores/GroupController';

/**
 * Переменные ----------------
 */
const teamController = useTeamStore();
const groupController = useGroupStore();
const route = useRoute();
const router = useRouter();
const $t = await useTranslate('groups');

/**
 * Получение данных ----------------
 */
// Данные группы
const { data: group } = await useCustomFetch(`team/groups/get`, {
  query: { team_id: teamController.activeTeamId, group_id: route.params.id },
});
// Сохраняем в хранилище
groupController.setGroup(group);
groupController.setUsers(group.users);
const nav = [
  { label: $t.title, link: `${teamController.activeTeamSlug}/settings/groups` },
  { label: group.name, link: route.fullPath },
];
console.log(group);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
