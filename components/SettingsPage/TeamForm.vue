<template>
  <form class="form" @submit.prevent="onChangeTeamData">
    <h2 class="title">{{ $t.team.title }}</h2>
    <UIInput
      :label="$t.team.inputName"
      v-model="nameValue"
      :errors="errors['name']"
    />
    <UIInput
      :label="$t.team.inputAddress"
      v-model="codeValue"
      :errors="errors['code']"
    />
    <p class="text">
      Поделитесь ссылкой
      <NuxtLink :to="`/companies/${teamController.activeTeamId}`"
        >{{ teamController.activeTeam?.team.code }}.itl.wiki
      </NuxtLink>
      чтобы добавить кого-либо с разрешенным доменом электронной почты в ваше
      рабочее пространство.
    </p>
    <button class="btn" :class="{ disabled: requestController.loading[url] }">
      {{ $t.team.btn }}
    </button>
  </form>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useFormValidation } from '~/hooks/useFormValidation';
import { useSettingsStore } from '~/stores/SettingsController';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useRequestStore } from '~/stores/RequestController';

/**
 * Переменные ----------------
 */
const url = '/team/edit';
const teamController = useTeamStore();
const settingsController = useSettingsStore();
const requestController = useRequestStore();
const nameValue = ref(teamController.activeTeam?.team.name || '');
const codeValue = ref(teamController.activeTeam?.team.code || '');
const $t = await useTranslate('settings_general');
const { errors, validateForm } = useFormValidation();

/**
 * Отслеживание переменных ----------------
 */
// Показать warning c ошибками
watch(settingsController.errors, () => {
  settingsController.setErrors(settingsController.errors);
});

/**
 * Методы ----------------
 */
// Изменить данные пользователя
const onChangeTeamData = async () => {
  // Убираем warning
  settingsController.setErrors([]);
  settingsController.setMessage('');

  // Данные
  const dto = {
    team_id: teamController.activeTeamId,
    name: nameValue.value,
    code: codeValue.value,
  };

  // Вызываем хук для валидации форм
  const isValid = await validateForm(dto, TeamScheme);
  if (!isValid) return false;

  // Обновляем данные пользователя
  const { message } = await useCustomFetch(url, {
    body: dto,
    method: 'POST',
  });

  if (message) {
    // Обновляем данные в хранилище
    teamController.editActiveTeam(dto);
    // Отображаем сообщение об успешном изменении
    settingsController.setMessage('Данные успешно изменены');
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.form {
  width: 688px;
  margin-bottom: 65px;
}

.text {
  margin-bottom: 25px;
}
</style>
