<template>
  <!-- Главный шаблон -->
  <NuxtLayout name="main">
    <!--------------------------------------
      Элементы управления
    ---------------------------------------->
    <div class="controls">
      <!-- Редактировать -->
      <NuxtLink
        class="control"
        :to="`${teamController.activeTeamSlug}/sections/edit/${data.section.id}`"
      >
        <svg-icon name="edit" />
      </NuxtLink>
      <!-- Доступ -->
      <svg-icon class="control" name="lock" />
      <!-- Удалить -->
      <svg-icon class="control" name="remove" @click="onDelete" />
    </div>

    <!--------------------------------------
      Шапка элемента
    ---------------------------------------->
    <div class="elem__header">
      <!-- Заголовок -->
      <h1 class="title">{{ data.section.name }}</h1>
    </div>

    <!--------------------------------------
      Информация об элементе
    ---------------------------------------->
    <ul class="elem__info">
      <!-- Автор -->
      <li class="elem__info-item">
        Автор:
        <span>{{
          `${data.section?.creator.first_name} ${data.section?.creator.last_name}`
        }}</span>
      </li>
      <!-- Время -->
      <li
        class="elem__info-item"
        v-html="
          useDateString(data.section.created_at, data.section.updated_at)
        "
      ></li>
    </ul>

    <!--------------------------------------
      Элементы раздела
    ---------------------------------------->
    <Item
      v-for="item in data.section.child"
      :data="item"
      type="section"
      :key="item.id"
    />
    <Item
      v-for="item in data.section.items"
      :data="item"
      type="article"
      :key="item.id"
    />
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useUserStore } from '~/stores/UserController';
import { useTeamStore } from '~/stores/TeamContoller';
import { useSectionsStore } from '~/stores/SectionContoller';
import { useSidebarStore } from '~/stores/SidebarController';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useDateString } from '~/hooks/useDateString';
import { TSectionData } from '~/utils/types/secton';

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут
const router = useRouter(); // Роутер
const teamController = useTeamStore(); // Хранилище активной команды
const userController = useUserStore(); // Хранилище пользователя
const sectionsController = useSectionsStore(); // Хранилище разделов
const sidebarController = useSidebarStore(); // Хранилище сайдбара

/**
 * Пользовательские переменные ----------------
 */
// Данные для запросов
const dto = {
  team_id: teamController.activeTeamId,
  section_id: route.params.id,
};

/**
 * Получение данных ----------------
 */
// Данные раздела
const { data } = await useCustomFetch<TSectionData>(`team/section`, {
  query: dto,
});
// Сохраняем в хранилище
sectionsController.setSection(data.value.section);

/**
 * Методы ----------------
 */
// Удаление элемента
const onDelete = async () => {
  // Подтверждение удаления
  if (window.confirm('Вы точно хотите удалить раздел?')) {
    // Удаляем элемент
    const { data } = await useCustomFetch(`team/section/delete`, {
      body: dto,
      method: 'POST',
    });

    if (data.value) {
      // Перенапрвляем пользователя
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

.elem__header {
  margin-top: 75px;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  position: relative;
}

.title {
  font-size: 24px;
  line-height: 28px;
}

.elem__info {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.elem__info-item {
  margin-right: 12px;
  color: $gray;
  span {
    color: $black;
  }
}

.body {
  margin-bottom: 50px;
}
</style>
