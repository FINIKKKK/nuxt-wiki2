<template>
  <form class="form" @submit.prevent="onChangeTeamData">
    <h2 class="title">Профиль компании</h2>
    <Input
      label="Название вашей компании"
      v-model="nameValue"
      :errors="errors['name']"
    />
    <Input
      label="Адресс вашей компании"
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
      Сохранить
    </button>
  </form>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import Input from '~/components/UI/Input.vue';
import { useTeamStore } from '~/stores/TeamContoller';
import { TeamScheme } from '~/utils/validation';
import { useFormValidation } from '~/hooks/useFormValidation';
import { useSettingsStore } from '~/stores/SettingsController';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useRequestStore } from '~/stores/RequestController';

/**
 * Переменные ----------------
 */
const teamController = useTeamStore();
const settingsController = useSettingsStore();
const requestController = useRequestStore();
const url = '/team/edit'; // URL запроса
const nameValue = ref(teamController.activeTeam?.team.name || '');
const codeValue = ref(teamController.activeTeam?.team.code || '');

/**
 * Хуки ----------------
 */
const { errors, validateForm } = useFormValidation(); // Для валидации формы

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
