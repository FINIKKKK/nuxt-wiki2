<template>
  <NuxtLayout name="create" type="section" :isEdit="true"></NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { useCreateElemStore } from '~/stores/CreateElemController';
import { useSectionsStore } from '~/stores/sectionsController';
import { TSectionEdit } from '~/utils/types/secton';

/**
 *  Переменные ----------------
 */
const route = useRoute();
const teamController = useTeamStore();
const createElemController = useCreateElemStore();
const sectionsController = useSectionsStore();

/**
 * Получение данных ----------------
 */
// Данные раздела
const { data } = await useCustomFetch<TSectionEdit>(`team/section/edit`, {
  query: { team_id: teamController.activeTeamId, section_id: route.params.id },
});
/**
 * Вычисляемое ----------------
 */
// Значение селекта
const section = sectionsController.sections?.find(
  (obj) => obj.id === data.section.parent_id,
);
// Сохраняем данные в хранилище
createElemController.setTitle(data.section.name);
createElemController.setSelect(
  section ? { value: section.id, label: section.name } : null,
);
createElemController.setAbilities(data.abilities);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
