<template>
  <NuxtLayout name="main">
    <!-- Отображение ошибок -->
    <Warning
      v-if="errors.length || messages.length"
      :errors="errors"
      :messages="messages"
    />

    <!-- Формы -->
    <div class="flex">
      <div class="left">
        <!-- Форма для изменения данных пользователя -->
        <FormUserData
          @showWarningErrors="setWarningErrors"
          @showWarningMessages="setWarningMessages"
        />
        <!-- Форма для изменения пароля пользователя -->
        <FormUserPassword
          @showWarningErrors="setWarningErrors"
          @showWarningMessages="setWarningMessages"
        />
      </div>

      <!-- Изменяем аватарки пользователя -->
      <UserAvatar
        @showWarningErrors="setWarningErrors"
        @showWarningMessages="setWarningMessages"
      />
    </div>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import FormUserData from '~/components/ProfileForms/FormUserData.vue';
import FormUserPassword from '~/components/ProfileForms/FormUserPassword.vue';
import Warning from '~/components/UI/Warning.vue';
import UserAvatar from '~/components/ProfileForms/UserAvatar.vue';

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

<style lang="scss" scoped>
.warning {
  margin: 0 -50px 50px;
}

.flex {
  display: flex;
  justify-content: space-between;
}
</style>
