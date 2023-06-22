<template>
  <!-- Главный шаблон -->
  <NuxtLayout name="main">
    <div v-if="section">
      <!--------------------------------------
      Элементы управления 
      ---------------------------------------->
      <div class="controls">
        <!-- Редактировать -->
        <NuxtLink
          class="control"
          :to="`${teamStore.activeTeamId}/sections/edit/${section.id}`"
        >
          <svg-icon name="edit" />
        </NuxtLink>
        <!-- Доступ -->
        <svg-icon class="control" name="lock" />
        <!-- Поделиться -->
        <svg-icon class="control" name="share" />
        <!-- Удалить -->
        <svg-icon class="control" name="remove" @click="onDelete" />
      </div>

      <!--------------------------------------
      Шапка элемента
      ---------------------------------------->
      <div class="elem__header">
        <!-- Заголовок -->
        <h1 class="title">{{ section.name }}</h1>
      </div>

      <!--------------------------------------
      Информация об элементе
      ---------------------------------------->
      <ul class="elem__info">
        <!-- Автор -->
        <li class="elem__info-item">
          Автор:
          <span>{{
            `${section?.creator.first_name} ${section?.creator.last_name}`
          }}</span>
        </li>
        <!-- Время -->
        <li class="elem__info-item">{{ date }}</li>
      </ul>

      <!--------------------------------------
      Тело элемента
      ---------------------------------------->
      <Body class="body" :data="section.blocks" />


      <!--------------------------------------
      Дополнительные элементы
      ---------------------------------------->
      <Item v-for="item in section.child" :data="item" :key="item.id"/>
    </div>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { Api } from '~/api';
import { useUserStore } from '~/stores/UserStore';
import { useHandleErrors } from '~/hooks/useHandleErrors';
import { useTeamStore } from '~/stores/TeamStore';
import { useFormatDate } from '~/hooks/useFormatData';

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут
const router = useRouter(); // Роутер
const teamStore = useTeamStore(); // Хранилище активной команды
const userStore = useUserStore(); // Хранилище пользователя

/**
 * Пользовательские переменные ----------------
 */
// Данные для запросов
const dto = {
  team_id: teamStore.activeTeam.team.id,
  section_id: route.params.id,
};

/**
 * Хуки ----------------
 */
// Для оработки ошибок
const { isLoading, handleSubmit } = useHandleErrors();

/**
 * Получение данных ----------------
 */
// Данные раздела
const { data: section } = useAsyncData(async () => {
  const { data } = await Api().section.getOne(dto);
  return data.section;
});

/**
 * Вычисляемые значения ----------------
 */
const date = computed(() => {
  if (section.value.created_at !== section.value.updated_at) {
    return `${useFormatDate(section.value.updated_at)} (Изменено)`;
  } else {
    return useFormatDate(section.value.updated_at);
  }
});

/**
 * Методы ----------------
 */
// Удаление элемента
const onDelete = async () => {
  // Подтверждение удаления
  if (window.confirm('Вы точно хотите удалить раздел?')) {
    // Хук для обботки ошибок
    handleSubmit(async () => {
      // Удаляем элемент
      await Api().section.delete(dto);
      // Перенапрвляем пользователя
      await router.push('/sections');
    });
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
