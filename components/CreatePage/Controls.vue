<template>
  <div class="controls">
    <!-- Дополнительные элементы -->
    <ul class="extra">
      <!-- Доступ -->
      <li class="extra__item" @click="createElemController.openAccess()">
        <i class="fa-regular fa-lock" />
        <p>{{ $t.access }}</p>
      </li>
      <!-- Тэги -->
      <li
        v-if="props.type === 'article'"
        class="extra__item"
        @click="createElemController.openTags()"
      >
        <i class="fa-regular fa-tag" />
        <p>{{ $t.tags }}</p>
      </li>
    </ul>

    <div class="right__controls">
      <!-- Надписи -->
      <div
        class="inscription draft"
        :class="{ active: saveDraft }"
        v-if="saveDraft"
      >
        <i class="fa-regular fa-check-circle" />
        <p>{{ saveDraft }}</p>
      </div>
      <div class="inscription" :class="{ active: isSave }" v-if="isSave">
        <i class="fa-regular fa-check-circle" />
        <p>{{ $t.saved }}</p>
      </div>

      <!-- Кнопки -->
      <div class="btns">
        <!-- Кнопка отпраки -->
        <button @click="onSubmit" class="btn" :class="{ disabled: isLoading }">
          {{ labelBtn }}
        </button>
        <!-- Кнопка отмены -->
        <NuxtLink
          :to="`${teamController.activeTeamSlug}/activity`"
          class="btn btn2"
          >{{ $t.btnCancel }}
        </NuxtLink>
      </div>

      <!-- Дополнительные настройки -->
      <div class="options" tabindex="1" @blur="isShowPopup = false">
        <!-- Кнопка открытия попапа -->
        <i
          class="fa-regular fa-ellipsis-h"
          @click="isShowPopup = !isShowPopup"
        />
        <!-- Попап -->
        <ul class="popup" v-if="isShowPopup">
          <li @click="onSaveDraft">
            {{ !isDraftPage ? $t.draftBtn : $t.draftBtn2 }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCreateElemStore } from '~/stores/CreateElemController';
import { useTeamStore } from '~/stores/TeamContoller';
import { ArticleDraftScheme, SectionScheme } from '~/utils/validation';
import { useFormValidation } from '~/hooks/useFormValidation';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useRequestStore } from '~/stores/RequestController';
import { TArticleData } from '~/utils/types/article';
import { TSection } from '~/utils/types/secton';
import { TMessage } from '~/utils/types';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  type: 'article' | 'section';
  isEdit?: boolean;
}>();

/**
 * Переменные ----------------
 */
const route = useRoute();
const router = useRouter();
const teamController = useTeamStore();
const createElemController = useCreateElemStore();
const requestController = useRequestStore();
const id = route.params.id;
const isShowPopup = ref(false);
const saveDraft = ref('');
const isSave = ref(false);
const { errors, validateForm } = useFormValidation();
const $t = await useTranslate('create_elem');
const isDraftPage = route.path.includes('draft');

/**
 * Вычисляемые значения ----------------
 */
// Label кнопки
const labelBtn = computed(() => {
  if (props.isEdit) {
    return $t.btnEdit;
  } else {
    return $t.btnPublish;
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
 * Вычисляемые значения ----------------
 */
let flag = true;
// Сохранять данные и показывать надпись
watch(
  [
    () => createElemController.title,
    () => createElemController.tabs,
    () => createElemController.select,
  ],
  () => {
    if (flag) {
      flag = false;
      return false;
    }

    setTimeout(() => {
      isSave.value = true;
      // Сохранение данных в localStorage
      localStorage.setItem(
        'article',
        JSON.stringify({
          name: createElemController.title,
          select: createElemController.select,
          tabs: createElemController.tabs,
        }),
      );
    }, 2000);
  },
  { deep: true },
);
// Убирать надпись
watch(isSave, () => {
  setTimeout(() => {
    isSave.value = false;
  }, 3000);
});

/**
 * Методы ----------------
 */
// Метод создания или редактирования элемента
const onSubmit = async () => {
  createElemController.changePublish(true);
  // ------------------------------------
  // Изменяем или создаем раздел
  // ------------------------------------
  if (props.type === 'section') {
    // Данные
    const dto = {
      ...(props.isEdit && {
        article_id: Number(id),
      }),
      team_id: teamController.activeTeam?.team.id,
      name: createElemController.title,
      section_id: Number(createElemController.select?.value) || null,
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
    const isValid = await validateForm(dto, SectionScheme);
    createElemController.setErrors(errors.value);
    if (!isValid) return false;

    // ------------------------------------
    // Редактируем раздела
    // ------------------------------------
    if (props.isEdit) {
      const { data } = await useCustomFetch<TSection>(`team/section/edit`, {
        body: dto,
        method: 'POST',
      });
      if (data) {
        await router.push(`${teamController.activeTeamSlug}/sections/${id}`);
      }
    }
    // ------------------------------------
    // Создаем раздел
    // ------------------------------------
    else {
      const { data } = await useCustomFetch<TSection>(`team/section/add`, {
        body: dto,
        method: 'POST',
      });
      if (data) {
        await router.push(
          `${teamController.activeTeamSlug}/sections/${data.id}`,
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
        article_id: Number(id),
      }),
      team_id: teamController.activeTeam?.team.id,
      name: createElemController.title,
      section_id: Number(createElemController.select?.value) || null,
      tabs: createElemController.tabs.map((obj) => ({
        name: obj.name,
        content: JSON.stringify(obj.content),
      })),
      abilities: createElemController.abilities.map((obj) => ({
        user_id: obj.user.id,
        permission: obj.permission.value,
      })),
      images: createElemController.tabs.map((obj) =>
        obj.content
          .filter((obj2) => obj2.type === 'image')
          .map((image) => image.id),
      ),
      action:
        teamController.activeTeam?.role.id === 1 ||
        teamController.activeTeam?.role.id === 2
          ? 3
          : 2,
    };

    // Вызываем хук для валидации форм
    const isValid = await validateForm(dto, ArticleScheme);
    createElemController.setErrors(errors.value);
    if (!isValid) return false;

    // ------------------------------------
    // Редактируем статью
    // ------------------------------------
    if (props.isEdit) {
      const { message } = await useCustomFetch<TMessage>(`team/article/edit`, {
        body: dto,
        method: 'POST',
      });
      if (message) {
        await router.push(`${teamController.activeTeamSlug}/articles/${id}`);
        localStorage.setItem('article', '');
      }
    }

    // ------------------------------------
    // Создаем статью
    // ------------------------------------
    else {
      const { data } = await useCustomFetch<TArticleData>(`team/article/add`, {
        body: dto,
        method: 'POST',
      });
      if (data) {
        await router.push(
          `${teamController.activeTeamSlug}/articles/${data.article.id}`,
        );
        localStorage.setItem('article', '');
      }
    }
  }
};

// Сохранить черновик
const onSaveDraft = async () => {
  // Данные
  const dto = {
    ...(isDraftPage && { article_id: route.params.id }),
    team_id: teamController.activeTeam?.team.id,
    name: createElemController.title,
    section_id: Number(createElemController.select?.value) || null,
    tabs: createElemController.tabs.map((obj) => ({
      name: obj.name,
      content: JSON.stringify(obj.content),
    })),
    action: 1,
  };

  // Валидируем данные
  const isValid = await validateForm(dto, ArticleDraftScheme);
  createElemController.setErrors(errors.value);
  isShowPopup.value = false;
  if (!isValid) return false;

  // Добавляем или редактируем черновик
  const { data, message } = await useCustomFetch<TArticleData>(
    !isDraftPage ? 'team/article/add' : 'team/article/edit',
    {
      body: dto,
      method: 'POST',
    },
  );

  if (data) {
    saveDraft.value = $t.draftText;
    setTimeout(() => {
      saveDraft.value = '';
    }, 3000);
    createElemController.changePublish(true);
    await router.push(
      `${teamController.activeTeamSlug}/articles/draft/${data.article.id}`,
    );
  }
  if (message) {
    saveDraft.value = $t.draftText2;
    setTimeout(() => {
      saveDraft.value = '';
    }, 3000);
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
  padding: 17px 50px;
  background-color: transparent;
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
    i {
      width: 14px;
      height: 20px;
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
}

.right__controls {
  display: flex;
  align-items: center;
  .options {
    margin-top: 5px;
    margin-left: 15px;
    i {
      transform: rotate(90deg);
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
    .popup {
      right: 50px;
      top: 55px;
      width: auto;
      li {
        cursor: pointer;
        &:hover {
          color: $blue;
        }
      }
    }
  }
}

.inscription {
  margin-right: 15px;
  display: flex;
  align-items: center;
  font-size: 14px;
  transition: 0.3s;
  opacity: 0;
  color: $blue;
  i {
    width: 17px;
    height: 17px;
    margin-right: 7px;
  }
  &.active {
    opacity: 1;
  }
}

.draft {
  color: $gray;
  i {
    color: $gray;
  }
}
</style>
