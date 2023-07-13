<template>
  <form class="form" @submit.prevent="onChangeSettings">
    <h2 class="title">Региональные настройки</h2>
    <UISelect
      label="Язык интерфейса"
      :options="languages"
      v-model="langValue"
      type="full"
      class="select"
    />
    <UISelect
      label="Формат даты"
      :options="[]"
      v-model="dateValue"
      type="full"
      class="select"
    />
    <button class="btn">Сохранить</button>
  </form>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useSettingsStore } from '~/stores/SettingsController';
import { languages } from '~/utils/data';

/**
 * Переменные ----------------
 */
const langCookie = useCookie('lang');
const teamController = useTeamStore();
const settingsController = useSettingsStore();
const langValue = ref(
  languages.find((obj) => obj.value === langCookie.value) || languages[0],
);
const dateValue = ref(null);

/**
 * Методы ----------------
 */
// Изменить данные пользователя
const onChangeSettings = async () => {
  langCookie.value = langValue.value.value;
  settingsController.setMessage('Настройки успешно обновлены');
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.form {
  width: 688px;
}

.text {
  margin-bottom: 25px;
}

.select {
  margin-bottom: 32px;
}
</style>
