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
        <NuxtLink :to="`/companies/${teamStore.activeTeam.team.id}`"
          >{{ teamStore.activeTeam.team.code }}.itl.wiki
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
import { useFormValidation } from '~/hooks/useFormValidation';
import { Api } from '~/api';
import { useTeamStore } from '~/stores/TeamContoller';
import { TeamScheme } from '~/utils/validation';

/**
 * События ----------------
 */
const emits = defineEmits(['showWarningErrors', 'showWarningMessages']);

/**
 * Системные переменные ----------------
 */
const teamStore = useTeamStore(); // Хранилище пользователя

/**
 * Пользовательские переменные ----------------
 */
const nameValue = ref(teamStore.activeTeam?.team.name); // Значене имени
const codeValue = ref(teamStore.activeTeam?.team.code); // Значене фамилии

/**
 * Хуки ----------------
 */
// Для обработки формы
const { errorsValidate, errors, isLoading, validateForm } = useFormValidation();

/**
 * Отслеживание переменных ----------------
 */
// Следить за errors
watch(errors, () => {
  // Показать warning c ошибками
  emits('showWarningErrors', errors.value);
});

/**
 * Методы ----------------
 */
// Изменить данные пользователя
const onChangeTeamData = async () => {
  // Убираем warning
  emits('showWarningErrors', []);
  emits('showWarningMessages', '');
  // Данные объекта
  const dto = {
    team_id: teamStore.activeTeam.team.id,
    name: nameValue.value,
    code: codeValue.value,
  };
  // Вызываем хук для валидации формы
  await validateForm(dto, TeamScheme, async () => {
    // Обновляем данные пользователя
    await Api().team.edit(dto);
    // Обновляем данные в хранилище
    teamStore.editActiveTeam(dto);
    // Отображаем сообщение об успешном изменении
    emits('showWarningMessages', 'Данные успешно изменены');
  });
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
