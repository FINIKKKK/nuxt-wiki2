<template>
  <div class="controls">
    <!-- Редактировать -->
    <div class="control">
      <NuxtLink
        :to="`${teamController.activeTeamSlug}/${
          'section' ? 'sections' : 'articles'
        }/edit/${route.params.id}`"
      >
        <svg-icon name="edit" />
      </NuxtLink>
    </div>
    <!-- Доступ -->
    <div class="control">
      <svg-icon name="lock" />
    </div>
    <!-- Удалить -->
    <div class="control">
      <svg-icon name="remove" @click="onDelete" />
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';

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
      `Вы точно хотите удалить ${props.type ? ' раздел' : 'статью'}?`,
    )
  ) {
    // Удаляем элемент
    const { data } = await useCustomFetch(`team/section/delete`, {
      body: {
        team_id: teamController.activeTeamId,
        ...(props.type === 'section' && { section_id: route.params.id }),
        ...(props.type === 'article' && { article_id: route.params.id }),
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
  display: flex;
  align-items: center;
  height: 100%;
  margin: -24px 0;
  .control {
    position: relative;
    &:not(:last-child) {
      margin-right: 10px;
    }
    cursor: pointer;
    padding: 22.5px 9px;
    height: 100%;
    transition: 0.2s;
    &:hover {
      background-color: $blue2;
    }
  }
  svg {
    width: 20px;
    height: 20px;
    fill: $blue;
  }
}
</style>
