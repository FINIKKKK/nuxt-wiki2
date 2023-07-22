<template>
  <NuxtLayout name="main" :title="$t.title">
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
    <div class="tags" v-if="tags?.length">
      <div class="tag" v-for="tag in tags">
        <input type="text" v-model="tag.name" v-if="editIdTag === tag.id" />
        <p v-else>{{ tag.name }}</p>
        <div class="btns">
          <i class="fa-regular fa-pencil" @click="() => setEditTag(tag.id)" />
          <i class="fa-regular fa-remove" @click="() => onRemoveTag(tag.id)" v-if="editIdTag !== tag.id" />
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

/**
 * Переменные ----------------
 */
const $t = await useTranslate('tags');
const userController = useUserStore();
const activeLetter = ref<{ index: number; letter: number } | null>(null);
const teamController = useTeamStore();
const tags = ref<TTag[]>([{ id: 1, name: 'Мой тэг' }]);
const editIdTag = ref<number | null>(null);

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
// tags.value = data;

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

// Поставить редактирования тэга
const setEditTag = (id: number) => {
  editIdTag.value = id;
};

// Удалить тэг
const onRemoveTag = async (id: number) => {
  if (window.confirm('')) {
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
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.tag {
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
</style>
