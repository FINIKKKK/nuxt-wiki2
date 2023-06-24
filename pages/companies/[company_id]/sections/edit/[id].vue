<template>
  <NuxtLayout
    name="create"
    type="section"
    :isEdit="true"
    :data="section"
    v-if="section"
  ></NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { Api } from '~/api';
import { useTeamStore } from '~/stores/TeamStore';

/**
 * Системные переменные ----------------
 */
const teamStore = useTeamStore(); // Хранилище активной команды
const route = useRoute(); // Роут

/**
 * Получение данных ----------------
 */
// Данные раздела
const { data: section } = useAsyncData(async () => {
  const dto = {
    team_id: teamStore.activeTeam.team.id,
    section_id: route.params.id,
  };
  const { data } = await Api().section.getOne(dto);
  return data.section;
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
