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
    <TagsPageField />

    <!--------------------------------------
     Тэги
    ---------------------------------------->
    <div class="tags" v-if="tagsController.tags?.length">
      <template v-for="tag in tagsController.tags" :key="tag.id">
        <TagsPageTag :data="tag" />
      </template>
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
import { useTagsStore } from '~/stores/TagsController';

/**
 * Мета ----------------
 */
definePageMeta({
  middleware: 'owner-access',
});

/**
 * Переменные ----------------
 */
const userController = useUserStore();
const teamController = useTeamStore();
const tagsController = useTagsStore();
const activeLetter = ref<{ index: number; letter: number } | null>(null);
const $t = await useTranslate('tags');

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
// tagsController.setTags(data);

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
  tagsController.setTags(data);
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

.tags {
  display: flex;
  flex-wrap: wrap;
}
</style>
