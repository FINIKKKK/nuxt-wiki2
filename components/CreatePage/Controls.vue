<template>
  <div class="controls">
    <!-- Дополнительные элементы -->
    <ul class="extra">
      <!-- Доступ -->
      <li class="extra__item" @click="createElemController.toggleAccess()">
        <svg-icon name="lock" />
        <p>Доступ</p>
      </li>
      <!-- Тэги -->
      <li
        v-if="props.type === 'article'"
        class="extra__item"
        @click="createElemController.toggleTags()"
      >
        <svg-icon name="tag" />
        <p>Тэги</p>
      </li>
    </ul>

    <!-- Кнопки -->
    <div class="btns">
      <!-- Кнопка отпраки -->
      <button @click="onSubmit" class="btn" :class="{ disabled: isLoading }">
        {{ labelBtn }}
      </button>
      <!-- Кнопка отмены -->
      <NuxtLink :to="`${teamController.activeTeamSlug}`" class="btn btn2"
        >Отменить
      </NuxtLink>
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCreateElemStore } from '~/stores/CreateElemController';
import { useTeamStore } from '~/stores/TeamContoller';
import { SectionScheme } from '~/utils/validation';
import { useFormValidation } from '~/hooks/useFormValidation';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useRequestStore } from '~/stores/RequestController';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  type: 'article' | 'section';
  isEdit?: boolean;
}>();

/**
 * Системные переменные ----------------
 */
const route = useRoute(); // Роут
const router = useRouter(); // Роутер
const teamController = useTeamStore(); // Хранилище активной компании
const createElemController = useCreateElemStore(); // Хранилище страницы создания
const requestController = useRequestStore(); // Хранилище запроса

/**
 * Полльзовательские переменные ----------------
 */
const id = route.params.id; // ID элемента

/**
 * Вычисляемые значения ----------------
 */
// Label кнопки
const labelBtn = computed(() => {
  if (props.isEdit) {
    return 'Изменить';
  } else {
    return 'Опубликовать';
  }
});
// Значение загрузки
const isLoading = computed(() => {
  return (
    requestController.loading['team/section/add'] ||
    requestController.loading['team/section/edit'] ||
    requestController.loading['team/article/add'] ||
    requestController.loading['team/article/edit']
  );
});

/**
 * Хуки ----------------
 */
const { errors, validateForm } = useFormValidation(); // Для валидации формы

/**
 * Методы ----------------
 */
// Метод создания или редактирования элемента
const onSubmit = async () => {
  // ------------------------------------
  // Изменяем или создаем раздел
  // ------------------------------------
  if (props.type === 'section') {
    // Данные
    const dto = {
      ...(props.isEdit && {
        section_id: id,
      }),
      team_id: teamController.activeTeam?.team.id,
      name: createElemController.title,
      ...(createElemController.select && {
        parent_id: createElemController.select.value,
      }),
      abilities: createElemController.abilities.map((obj) => ({
        user_id: obj.user.id,
        permission: obj.permission.value,
      })),
      action: 3,
    };

    // Вызываем хук для валидации форм
    const isValid = await validateForm(dto, SectionScheme);
    createElemController.setErrors(errors.value);
    if (!isValid) return false;

    // ------------------------------------
    // Редактируем раздела
    // ------------------------------------
    if (props.isEdit) {
      const { data } = await useCustomFetch(`team/section/edit`, {
        body: dto,
        method: 'POST',
      });
      if (data.value) {
        await router.push(`${teamController.activeTeamSlug}/sections/${id}`);
      }
    }
    // ------------------------------------
    // Создаем раздела
    // ------------------------------------
    else {
      const { data } = await useCustomFetch(`team/section/add`, {
        body: dto,
        method: 'POST',
      });
      if (data.value) {
        await router.push(
          `${teamController.activeTeamSlug}/sections/${data.value.section.id}`,
        );
      }
    }
  }

  // ------------------------------------
  // Изменяем или создаем статью
  // ------------------------------------
  else if (props.type === 'article') {
    // Данные
    const dto = {
      ...(props.isEdit && {
        article_id: id,
      }),
      team_id: teamController.activeTeam?.team.id,
      name: createElemController.title,
      section_id: createElemController.select.value,
      tabs: createElemController.tabs.map((obj) => ({
        name: obj.name,
        content: JSON.stringify(obj.content),
      })),
      abilities: createElemController.abilities.map((obj) => ({
        user_id: obj.user.id,
        permission: obj.permission.value,
      })),
      action: 3,
    };

    // Вызываем хук для валидации форм
    const isValid = await validateForm(dto, ArticleScheme);
    createElemController.setErrors(errors.value);
    if (!isValid) return false;

    // ------------------------------------
    // Редактируем статью
    // ------------------------------------
    if (props.isEdit) {
      const { data } = await useCustomFetch(`team/article/add`, {
        body: dto,
        method: 'POST',
      });
      if (data.value) {
        await router.push(`${teamController.activeTeamSlug}/articles/${id}`);
      }
    }

    // ------------------------------------
    // Создаем статью
    // ------------------------------------
    else {
      const { data } = await useCustomFetch(`team/article/add`, {
        body: dto,
        method: 'POST',
      });
      if (data.value) {
        await router.push(
          `${teamController.activeTeamSlug}/articles/${data.value.article.id}`,
        );
      }
    }
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.controls {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: $bg;
  padding: 17px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
}

.extra {
  user-select: none;
  display: flex;
  align-items: center;
  &__item {
    &:not(:last-child) {
      margin-right: 35px;
    }
    display: flex;
    align-items: center;
    cursor: pointer;
    svg {
      width: 14px;
      height: 14px;
      margin-right: 14px;
    }
    &:hover {
      color: $blue;
    }
  }
}

.btns {
  display: flex;
  align-items: center;
  .btn {
    padding: 10px 15px;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
  .options {
    width: 20px;
    height: 20px;
  }
}
</style>
