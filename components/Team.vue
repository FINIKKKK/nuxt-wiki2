<template>
  <li class="team">
    <NuxtLink :to="`/companies/${props.data.id}/activity`" class="title"
      >{{ props.data.name }}
    </NuxtLink>
    <ul class="info">
      <li class="info__item">
        <span>{{ $t.team.plan }}:</span>
        {{ props.data.plan.name === 'Бесплатный' && $t.team.planTypeFree }}
      </li>
      <li class="info__item">
        <span>{{ $t.team.users }}:</span> {{ props.data.employees_count }}
      </li>
      <li class="info__item">
        <span>{{ $t.team.address }}:</span>
        {{ props.data.code }}.wiki.itl.systems
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

const $t = await useTranslate('teams');

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
