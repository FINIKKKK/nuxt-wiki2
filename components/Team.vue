<template>
  <li class="team">
    <NuxtLink :to="`/companies/${props.data.id}`" class="title"
      >{{ props.data.name }}
    </NuxtLink>
    <ul class="info">
      <li class="info__item"><span>План:</span> {{ props.data.plan.name }}</li>
      <li class="info__item">
        <span>Пользователи:</span> {{ props.data.employees_count }}
      </li>
      <li class="info__item">
        <span>Адресс:</span> {{ props.data.code }}.wiki.itl.systems
      </li>
    </ul>
    <span class="notices" v-if="props.data.unread_notification">{{
      props.data.unread_notification
    }}</span>
  </li>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { TTeam } from '~/utils/types/team';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  data: TTeam;
}>();
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.team {
}
</style>
