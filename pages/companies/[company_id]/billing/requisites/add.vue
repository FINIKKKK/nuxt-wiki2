<template>
  <PagesFormRequisite />
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
/**
 * Мета ----------------
 */
import { useRequisitesStore } from '~/stores/RequisitesController';
import { useTeamStore } from '~/stores/TeamContoller';

definePageMeta({
  middleware: [
    'owner-access',
    'requisites',
    async () => {
      const requisitesController = useRequisitesStore();
      const teamController = useTeamStore();

      if (requisitesController.requisites) {
        return navigateTo(
          `${teamController.activeTeamSlug}/billing/requisites`,
        );
      }
    },
  ],
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
