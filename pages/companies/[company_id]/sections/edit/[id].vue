<template>
  <NuxtLayout name="create" type="section" :isEdit="true"></NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { useCreateElemStore } from '~/stores/CreateElemController';
import { useSectionsStore } from '~/stores/SectionContoller';
import { TSectionEdit } from '~/utils/types/secton';

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут
const teamController = useTeamStore(); // Хранилище активной компании
const createElemController = useCreateElemStore(); // Хранилище страницы создания
const sectionsController = useSectionsStore(); // Хранилище разделов

/**
 * Получение данных ----------------
 */
// Данные раздела
const { data } = await useCustomFetch<TSectionEdit>(`team/section/edit`, {
  query: { team_id: teamController.activeTeamId, section_id: route.params.id },
});
/**
 * Вычисляемые значения ----------------
 */
// Значение селекта
const section = sectionsController.sections?.find(
  (obj) => obj.id === data.value.section.parent_id,
);
// Сохраняем данные в хранилище
createElemController.setTitle(data.value.section.name);
createElemController.setSelect(
  section ? { value: section.id, label: section.name } : null,
);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
