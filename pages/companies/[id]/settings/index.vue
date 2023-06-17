<template>
  <NuxtLayout name="main">
    <!-- Отображение ошибок -->
    <Warning
      v-if="errors.length || messages.length"
      :errors="errors"
      :messages="messages"
    />

    <!-- Форма изменения фанных компаниии -->
    <TeamForm
      @showWarningErrors="setWarningErrors"
      @showWarningMessages="setWarningMessages"
    />
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import TeamForm from '~/componets/SettingsForms/TeamForm.vue';
import Warning from '~/componets/UI/Warning.vue';

/**
 * Пользовательские переменные ----------------
 */
const errors = ref([]); // Ошибки
const messages = ref(''); // Сообщения

/**
 * Методы ----------------
 */
// Установление ошибок (событие)
const setWarningErrors = (value: string[]) => {
  errors.value = value;
};
// Установление сообщений (событие)
const setWarningMessages = (value: string) => {
  messages.value = value;
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
