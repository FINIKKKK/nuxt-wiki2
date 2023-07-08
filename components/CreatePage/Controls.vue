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

    <div class="right__controls">
      <!-- Надписи -->
      <div class="inscription draft" :class="{ active: saveDraft }">
        <svg-icon name="check" />
        <p>Черновик сохранен</p>
      </div>
      <div class="inscription" :class="{ active: isSave }">
        <svg-icon name="check" />
        <p>Сохранено</p>
      </div>

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

      <!-- Дополнительные настройки -->
      <div class="options" ref="popupRef">
        <svg-icon name="options" @click="isShowPopup = !isShowPopup" />
        <ul class="popup" v-if="isShowPopup">
          <li @click="onSaveDraft">Сохранить черновик</li>
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
import { SectionScheme } from '~/utils/validation';
import { useFormValidation } from '~/hooks/useFormValidation';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useRequestStore } from '~/stores/RequestController';
import { useOutsideClick } from '~/hooks/useOutsideClick';
import {TArticleData} from "~/utils/types/article";
import {TSectionData} from "~/utils/types/secton";

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
 * Пользовательские переменные ----------------
 */
const id = route.params.id; // ID элемента
const isShowPopup = ref(false); // Показывать попап?
const popupRef = ref(null);
const saveDraft = ref(false); // Показывать надпись "Черновик сохранен"?
const isSave = ref(false); //  Показывать надпись "Сохранено"?

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
useOutsideClick(popupRef, isShowPopup); // Для закрытия попапа

/**
 * Слежка за значениями ----------------
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
const onSaveDraft = async () => {
  //
  const { data } = await useCustomFetch(`team/article/add`, {
    body: {
      team_id: teamController.activeTeam?.team.id,
      name: createElemController.title,
      section_id: Number(createElemController.select?.value) || null,
      tabs: createElemController.tabs.map((obj) => ({
        name: obj.name,
        content: JSON.stringify(obj.content),
      })),
      action: 1,
    },
    method: 'POST',
  });
  if (data.value) {
    saveDraft.value = true;
    setTimeout(() => {
      saveDraft.value = false;
    }, 3000);
  }
};
// Метод создания или редактирования элемента
const onSubmit = async () => {
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
      const { data } = await useCustomFetch<TSectionData>(`team/section/edit`, {
        body: dto,
        method: 'POST',
      });
      if (data.value) {
        await router.push(`${teamController.activeTeamSlug}/sections/${id}`);
        localStorage.setItem('article', '');
      }
    }
    // ------------------------------------
    // Создаем раздела
    // ------------------------------------
    else {
      const { data } = await useCustomFetch<TSectionData>(`team/section/add`, {
        body: dto,
        method: 'POST',
      });
      if (data.value) {
        await router.push(
          `${teamController.activeTeamSlug}/sections/${data.value.section.id}`,
        );
        localStorage.setItem('article', '');
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
      const { data } = await useCustomFetch<TArticleData>(`team/article/edit`, {
        body: dto,
        method: 'POST',
      });
      if (data.value) {
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
      if (data.value) {
        await router.push(
          `${teamController.activeTeamSlug}/articles/${data.value.article.id}`,
        );
        localStorage.setItem('article', '');
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
}

.right__controls {
  display: flex;
  align-items: center;
  .options {
    margin-top: 5px;
    margin-left: 15px;
    svg {
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
  svg {
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
  svg {
    fill: $gray;
  }
}
</style>
