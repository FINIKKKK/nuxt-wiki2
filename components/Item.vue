<template>
  <div class="item">
    <!-- Иконка -->
    <svg-icon name="folder" />
    <!-- Заголовок -->
    <div class="item__info">
      <NuxtLink :to="`/${teamStore.activeTeamId}/sections/${props.data.id}`">
        {{ props.data.name }}
      </NuxtLink>
      <!-- Дата -->
      <div
        class="date"
        v-html="useDateString(props.data.created_at, props.data.updated_at)"
      ></div>
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useHandleErrors } from '~/hooks/useHandleErrors';
import { useUserStore } from '~/stores/UserStore';
import { useTeamStore } from '~/stores/TeamStore';
import { TSection } from '~/api/models/section';
import { useFormatDate } from '~/hooks/useFormatData';
import { useDateString } from '~/hooks/useDateString';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  data: TSection;
}>();

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут
const teamStore = useTeamStore(); // Хранилище активной компании
const userStore = useUserStore(); // Хранилище данных пользователя

/**
 * Хуки ----------------
 */
// Для обработки ошибок
const { isLoading, handleSubmit } = useHandleErrors();
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 9px 12px;
  transition: 0.3s;
  border-radius: 3px;
  &:hover {
    background-color: $blue2;
  }
  svg {
    width: 32px;
    height: 32px;
    margin-right: 15px;
  }
  a {
    margin-bottom: 0px;
    &:hover {
      text-decoration: none;
    }
  }
  .date {
    font-size: 12px;
    line-height: 14px;
    color: $gray;
    span {
      color: $black;
    }
  }
}
</style>
