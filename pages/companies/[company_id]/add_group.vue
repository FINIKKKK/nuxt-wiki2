<template>
  <NuxtLayout name="main" :title="$t.index.btn" :nav="nav">
    <form class="form" @submit.prevent="onCreateGroup">
      <UIInput :label="$t.create.input" v-model="inputValue" :errors="errors['name']"/>
      <p class="small">
        {{ $t?.create?.smallText1 }}
        <a href="#">{{ $t?.create?.smallLink1 }}</a
        >{{ $t?.create?.smallText2 }}
        <a href="#">{{ $t?.create?.smallLink2 }}</a>
      </p>
      <button class="btn">{{ $t.index.btn }}</button>
    </form>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTeamStore } from '~/stores/TeamContoller';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import {useFormValidation} from "~/hooks/useFormValidation";
import {GroupScheme} from "~/utils/validation";

/**
 * Переменные ----------------
 */
const $t = await useTranslate('groups');
const teamController = useTeamStore();
const route = useRoute();
const router = useRouter();
const inputValue = ref('');
const nav = [
  { label: $t.title, link: `${teamController.activeTeamSlug}/settings/groups` },
  { label: $t.index.btn, link: route.fullPath },
];
const { errors, validateForm } = useFormValidation();

/**
 * Методы ----------------
 */
// Создаем группу
const onCreateGroup = async () => {
  // Данные
  const dto = {
    team_id: teamController.activeTeamId,
    name: inputValue.value,
  };

  // Валидируем данные
  const isValid = await validateForm(dto, GroupScheme);
  if (!isValid) return false;

  // Создаем группу
  const { data } = await useCustomFetch(`team/groups/add`, {
    body: dto,
    method: 'POST',
  });

  if (data) {
    // Перенаправляем пользователя на страницу этой группы
    await router.push(`${teamController.activeTeamSlug}/groups/${data.id}`);
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
