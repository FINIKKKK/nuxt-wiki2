<template>
  <form class="form" @submit.prevent="onChangeSettings">
    <h2 class="title">{{ $t.region.title }}</h2>
    <UISelect
      :label="$t.region.selectLang"
      :options="languages"
      v-model="langValue"
      type="full"
      class="select"
    />
    <UISelect
      :label="$t.region.selectDate"
      :options="[]"
      v-model="dateValue"
      type="full"
      class="select"
    />
    <button class="btn">{{ $t.region.btn }}</button>
  </form>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useSettingsStore } from '~/stores/SettingsController';
import { useUserStore } from '~/stores/UserController';

/**
 * Переменные ----------------
 */
const langCookie = useCookie('lang');
const teamController = useTeamStore();
const userController = useUserStore();
const settingsController = useSettingsStore();
const dateValue = ref(null);
const $t = await useTranslate('settings_general');
const router = useRouter();
const languages = [
  { value: 'ru', label: $t.languages.ru },
  { value: 'en', label: $t.languages.en },
];
const langValue = ref(
  languages.find((obj) => obj.value === langCookie.value) || languages[0],
);

/**
 * Методы ----------------
 */
// Изменить данные пользователя
const onChangeSettings = async () => {
  langCookie.value = langValue.value.value;
  settingsController.setMessage('Настройки успешно обновлены');
  window.location.reload()
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
