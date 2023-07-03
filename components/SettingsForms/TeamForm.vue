<template>
  <form class="form" @submit.prevent="onChangeTeamData">
    <h2 class="title">Профиль компании</h2>
    <div class="content">
      <Input
        label="Название вашей компании"
        v-model="nameValue"
        :errors="errorsValidate['name'] || []"
      />
      <Input
        label="Адресс вашей компании"
        v-model="codeValue"
        :errors="errorsValidate['code'] || []"
      />
      <p>
        Поделитесь ссылкой
        <NuxtLink :to="`/companies/${teamController.activeTeamId}`"
          >{{ teamController.activeTeam.team.code }}.itl.wiki
        </NuxtLink>
        чтобы добавить кого-либо с разрешенным доменом электронной почты в ваше
        рабочее пространство.
      </p>
    </div>
    <button class="btn" :class="{ disabled: isLoading }">Сохранить</button>
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

/**
 * Системные переменные ----------------
 */
const teamController = useTeamStore(); // Хранилище пользователя
const settingsController = useSettingsStore(); // Хранилище страницы настроек

/**
 * Пользовательские переменные ----------------
 */
const url = '/team/edit'; // URL запроса
const nameValue = ref(teamController.activeTeam?.team.name || ''); // Значене имени
const codeValue = ref(teamController.activeTeam?.team.code || ''); // Значене фамилии

/**
 * Хуки ----------------
 */
const { errorsValidate, validateForm } = useFormValidation(); // Для валидации формы

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

  // Данные объекта
  const dto = {
    team_id: teamController.activeTeamId,
    name: nameValue.value,
    code: codeValue.value,
  };

  // Вызываем хук для валидации форм
  const isValid = await validateForm(dto, TeamScheme);
  if (!isValid) return false;

  // Обновляем данные пользователя
  const { data } = await useCustomFetch<any>(url, {
    body: dto,
    method: 'POST',
  });

  if (data.value) {
    // Обновляем данные в хранилище
    teamController.editActiveTeam(dto);
    // Отображаем сообщение об успешном изменении
    settingsController.setMessage('Данные успешно изменены');
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
