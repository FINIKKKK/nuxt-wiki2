<template>
  <NuxtLayout name="main" :title="$t.title">
    <!-- Отображение ошибок -->
    <UIWarning
      v-if="requestController.loading?.length"
      :errors="requestController.errors[url]"
    />

    <!-- Форма -->
    <form class="form" @submit.prevent="onAddTeam">
      <UIInput
        :label="$t.inputName"
        v-model="nameValue"
        :errors="errors['name']"
      />
      <UIInput
        :label="$t.inputAddress"
        v-model="addressValue"
        :errors="errors['address']"
        type="address"
      />
      <p class="small">
        {{ $t.smallText1 }}
        <a href="#">{{ $t.smallLink1 }}</a
        >{{ $t.smallText2 }}
        <a href="#">{{ $t.smallLink2 }}</a>
      </p>

      <button class="btn" :class="{ disabled: requestController.loading[url] }">
        {{ $t.btn }}
      </button>
    </form>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useFormValidation } from '~/hooks/useFormValidation';
import { TeamScheme } from '~/utils/validation';
import { useRequestStore } from '~/stores/RequestController';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTranslate } from '~/hooks/useTranslate';

/**
 * Переменные ----------------
 */
const router = useRouter();
const requestController = useRequestStore();
const url = 'team/add';
const nameValue = ref('');
const addressValue = ref('');
const { errors, validateForm } = useFormValidation();
const $t = await useTranslate('create_company');

/**
 * Методы ----------------
 */
// Создаем команду
const onAddTeam = async () => {
  // Объект с данными
  const dto = {
    name: nameValue.value,
    code: addressValue.value,
  };

  // Вызываем хук для валидации форм
  const isValid = await validateForm(dto, TeamScheme);
  if (!isValid) return false;

  // Создание команды
  const { data } = await useCustomFetch<number>(url, {
    body: dto,
    method: 'POST',
  });

  if (data) {
    // Перенаправляем пользователя на главную
    await router.push('/add_users');
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.form small {
  margin-bottom: 25px;
}
</style>