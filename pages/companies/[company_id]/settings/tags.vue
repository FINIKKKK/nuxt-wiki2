<template>
  <NuxtLayout name="main" :title="$t.title">
    <!--------------------------------------
     Алфавит
    ---------------------------------------->
    <div class="alphabet">
      <b
        v-for="(letter, index) in alphabet"
        :key="index"
        class="letter"
        :class="index === activeLetter"
        @click="() => setActiveLetter(index, letter)"
      >
        {{ letter }}
      </b>
    </div>

    <!--------------------------------------
     Кнопка добавления нового тэга
    ---------------------------------------->
    <UIInput
      :label="$t.input"
      v-model="inputValue"
      @keydown.enter="onCreateTag"
      @click="onCreateTag"
      :errors="errors['name']"
      class="tag_input"
    >
      <template #btn2>
        <i class="fa-regular fa-plus" />
      </template>
    </UIInput>

    <!--------------------------------------
     Тэги
    ---------------------------------------->
    <div class="tags" v-if="tags?.length">
      <div class="tag" v-for="tag in tags">
        <input type="text" v-model="tag.name" v-if="editIdTag === tag.id" />
        <p v-else>{{ tag.name }}</p>

        <!-- Кнопки управления -->
        <div class="btns">
          <i
            class="fa-regular fa-pencil"
            @click="editIdTag = tag.id"
            :title="$t.edit"
            v-if="!editIdTag"
          />
          <i
            class="fa-regular fa-pencil"
            @click="() => onEditTag(tag.id, tag.name)"
            :title="$t.edit"
            v-else
          />
          <i
            class="fa-regular fa-remove"
            @click="editIdTag = null"
            v-if="editIdTag === tag.id"
            :title="$t.cancel"
          />
          <i
            class="fa-regular fa-trash"
            @click="() => onRemoveTag(tag.id)"
            v-if="editIdTag !== tag.id"
            :title="$t.delete"
          />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useUserStore } from '~/stores/UserController';
import { useTeamStore } from '~/stores/TeamContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { TTag } from '~/utils/types/tag';
import { useFormValidation } from '~/hooks/useFormValidation';
import {TagScheme} from "~/utils/validation";

/**
 * Переменные ----------------
 */
const $t = await useTranslate('tags');
const userController = useUserStore();
const activeLetter = ref<{ index: number; letter: number } | null>(null);
const teamController = useTeamStore();
const tags = ref<TTag[]>([]);
const editIdTag = ref<number | null>(null);
const inputValue = ref('');
const { errors, validateForm } = useFormValidation();

// Вывод русских букв
const russianAlphabet = () => {
  let russianAlphabet = '';
  for (let i = 1040; i <= 1071; i++) {
    russianAlphabet += String.fromCharCode(i);
  }
  return russianAlphabet;
};
// Вывод английских букв
const englishAlphabet = () => {
  let englishAlphabet = '';
  for (let i = 65; i <= 90; i++) {
    englishAlphabet += String.fromCharCode(i);
  }
  return englishAlphabet;
};
// Алфавит
const alphabet =
  userController.lang === 'ru' ? russianAlphabet() : englishAlphabet();

/**
 * Получение данных ----------------
 */
// Все тэги
const { data } = await useCustomFetch<TTag[]>(`team/settings/tags`, {
  query: { team_id: teamController.activeTeamId },
});
tags.value = data;

/**
 * Методы ----------------
 */
// Установить активную букву
const setActiveLetter = async (index, letter) => {
  activeLetter.value = {
    index,
    letter,
  };

  // Поиск тэгов по букве
  const { data } = await useCustomFetch<TTag[]>(`team/settings/tags/find`, {
    query: {
      team_id: teamController.activeTeamId,
      query: activeLetter.value.letter.toLowerCase(),
    },
  });
  tags.value = data;
};

// Изменить тэг
const onEditTag = async (id: number, name: string) => {
  const { message } = await useCustomFetch(`team/settings/tags/edit`, {
    body: {
      team_id: teamController.activeTeamId,
      tag_id: id,
      name,
    },
    method: 'POST',
  });

  if (message) {
    editIdTag.value = null;
  }
};

// Удалить тэг
const onRemoveTag = async (id: number) => {
  if (window.confirm($t.confirm)) {
    const { message } = await useCustomFetch(`team/settings/tags/delete`, {
      body: {
        team_id: teamController.activeTeamId,
        tag_id: id,
      },
      method: 'POST',
    });

    if (message) {
      // Удалим элемент из массива
      tags.value = tags.value.filter((obj) => obj.id !== id);
    }
  }
};

// Создать тэг
const onCreateTag = async () => {
  // Данные
  const dto = {
    team_id: teamController.activeTeamId,
    name: inputValue.value,
  };

  // Валидируем данные
  const isValid = await validateForm(dto, TagScheme);
  if (!isValid) return false;

  // Создать тэг
  const { data } = await useCustomFetch(`team/settings/tags/add`, {
    body: dto,
    method: 'POST',
  });

  if (data) {
    // Добавить новый тэг в список
    tags.value.push(data);
    // Очистить поле
    inputValue.value = '';
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.alphabet {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 45px;
  .letter {
    &:not(:last-child) {
      margin-right: 15px;
    }
    margin-bottom: 15px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-transform: uppercase;
    color: $blue;
    padding: 8px;
    border-radius: 2px;
    border: 1px solid transparent;
    &.active {
      border-color: $blue;
    }
  }
}

.tag_input {
  margin-bottom: 45px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  &:not(:last-child) {
    margin-right: 25px;
  }
  margin-bottom: 25px;
  display: inline-flex;
  align-items: center;
  border-radius: 2px;
  border: 1px solid rgba($gray, 0.5);
  padding: 8px 18px;
  p {
    font-size: 14px;
    margin-right: 15px;
  }
  input {
    font-size: 14px;
    display: inline-block;
    margin-right: 15px;
  }
  .btns {
    display: flex;
    align-items: center;
    i {
      &:not(:last-child) {
        margin-right: 8px;
      }
      cursor: pointer;
      font-size: 12px;
      color: $gray;
      &:hover {
        color: $blue;
      }
      &.fa-remove {
        font-size: 16px;
      }
    }
  }
}
</style>

<style lang="scss">
.tag_input {
  .btn-icon {
    margin-top: 0px;
    i {
      font-weight: 400;
    }
  }
}
</style>