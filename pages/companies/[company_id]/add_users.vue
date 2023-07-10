<template>
  <NuxtLayout name="main" title="Добавление пользователей">
    <!-- Ошибки -->
    <UIWarning
      class="warning"
      :errors="requestController.errors[url]"
      v-if="requestController.errors[url]"
    />

    <!-- Форма -->
    <div class="form">
      <div class="content">
        <p>
          Основные достоинства itl.wiki раскрываются, когда вы работаете в
          связке с другими участниками команды и обсуждаете проекты.
        </p>
        <div class="emails__input">
          <!-- Поле ввода -->
          <UIInput
            label="Введите email адреса через запятую"
            v-model="emailUsers"
            :errors="errors['emails']"
            @keydown.enter="() => onAddEmail(emailUsers)"
            @input="onSplitAddEmail"
          />
          <div
            class="btn emails__input-btn"
            @click="() => onAddEmail(emailUsers)"
          >
            Добавить
          </div>
        </div>

        <!-- Список emails -->
        <ul class="emails" v-if="emails.length">
          <li class="email" v-for="(email, index) in emails" :key="index">
            <p>{{ email }}</p>
            <svg-icon name="close" @click="() => onRemoveEmail(email)" />
          </li>
        </ul>

        <!-- Селект -->
        <UISelect
          :options="roles"
          v-model="selectValue"
          type="full"
          class="select"
        />

        <small>
          Нажимая кнопку «Выслать приглашение» вы принимаете
          <a href="#">Условия обслуживания в отношении продуктов ITL</a> и
          соглашаетесь с <a href="#">Политикой конфиденциальности</a>
        </small>
      </div>

      <button
        class="btn"
        :class="requestController.loading[url]"
        @click="onInviteUsers"
      >
        Выслать приглашение
      </button>
    </div>
  </NuxtLayout>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { roles } from '~/utils/data';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { useRequestStore } from '~/stores/RequestController';
import { useFormValidation } from '~/hooks/useFormValidation';
import { AddUsersScheme, AddUsersScheme2 } from '~/utils/validation';

/**
 * Переменные ----------------
 */
const url = 'team/employees/add';
const emailUsers = ref('');
const selectValue = ref(roles[0]);
const teamController = useTeamStore();
const requestController = useRequestStore();
const emails = ref([]);
const router = useRouter();

/**
 * Хуки ----------------
 */
const { errors, validateForm } = useFormValidation(); // Для валидации формы

/**
 * Методы ----------------
 */
// Приглагшаем пользователей
const onInviteUsers = async () => {
  // Данные запроса
  const dto = {
    team_id: teamController.activeTeamId,
    role: selectValue.value.value,
    emails: emails.value,
  };

  // Валидируем данные
  const isValid = await validateForm({ emails: emails.value }, AddUsersScheme);
  if (!isValid) return false;

  // Высылаем приглашения
  const { data } = await useCustomFetch(url, {
    body: dto,
    method: 'POST',
  });
};

// Добавить email в список
const onAddEmail = async (email: string) => {
  console.log(email);
  // Валидируем данные
  const isValid = await validateForm(
    { emails: emailUsers.value },
    AddUsersScheme2,
  );
  if (!isValid) return false;

  if (!emails.value.find((obj) => obj === email)) {
    // Добавить email
    emails.value.push(email.trim());
  }
  emailUsers.value = '';
};

// Добавить email в список через запятую
const onSplitAddEmail = (e) => {
  if (e.target.value.includes(',')) {
    onAddEmail(emailUsers.value.split(',')[0]);
  }
};

// Удалить email из списка
const onRemoveEmail = (email: string) => {
  emails.value = emails.value.filter((obj) => obj !== email);
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.form {
  p {
    margin-bottom: 32px;
  }
  .select {
    margin-bottom: 32px;
  }
  small {
    color: $gray;
    font-size: 14px;
    line-height: 16px;
    a {
      color: $gray;
      text-decoration: underline;
    }
  }
}

.warning {
  margin: 0px -50px 50px;
}

.emails__input {
  position: relative;
  &-btn {
    cursor: pointer;
    position: absolute;
    top: 6px;
    right: 6px;
    font-size: 14px;
    padding: 8px 24px;
    background-color: $blue;
    color: $white;
  }
}

.emails {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 12px;
  .email {
    &:not(:last-child) {
      margin-right: 20px;
    }
    background-color: $blue2;
    display: flex;
    align-items: center;
    border-radius: 2px;
    padding: 10px 15px;
    margin-bottom: 20px;
    p {
      color: $blue;
      margin-right: 10px;
    }
    svg {
      width: 17px;
      height: 17px;
      cursor: pointer;
    }
  }
}
</style>
