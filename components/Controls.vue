<template>
  <div class="controls">
    <!-- Редактировать -->
    <NuxtLink
      class="control"
      :to="`${teamController.activeTeamSlug}/sections/edit/${route.params.id}`"
    >
      <svg-icon name="edit" />
    </NuxtLink>
    <!-- Доступ -->
    <svg-icon class="control" name="lock" />
    <!-- Удалить -->
    <svg-icon class="control" name="remove" @click="onDelete" />
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  type: 'article' | 'section';
}>();

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут
const router = useRouter(); // Роутер
const teamController = useTeamStore(); // Хранилище команд

/**
 * Методы ----------------
 */
// Удаление элемента
const onDelete = async () => {
  // Подтверждение удаления
  if (
    window.confirm(
      `Вы точно хотите удалить ${props.type ? 'заздел' : 'статью'}?`,
    )
  ) {
    // Удаляем элемент
    const { data } = await useCustomFetch(`team/section/delete`, {
      body: {
        team_id: teamController.activeTeamId,
        section_id: route.params.id,
      },
      method: 'POST',
    });

    if (data.value) {
      // Перенаправляем пользователя
      await router.push(`${teamController.activeTeamId}`);
    }
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.controls {
  position: absolute;
  right: 50px;
  top: 46px;
  .control {
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
  svg {
    cursor: pointer;
    width: 35px;
    height: 35px;
    fill: $blue;
    padding: 7px;
    border-radius: 5px;
    &:hover {
      background-color: $blue2;
    }
    &.active {
      background-color: $blue2;
    }
  }
}
</style>
