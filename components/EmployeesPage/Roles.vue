<template>
  <UIAsidePopup
    :title="$t.changeRoles.title"
    :isOpen="props.active"
    @close="employeesController.closeRoles()"
  >
    <p class="text">{{ $t.changeRoles.text }}</p>
    <div class="role" @click="() => onChangeRole('user')">
      <h3>{{ $t.changeRoles.user }}</h3>
      <p>{{ $t.changeRoles.userText }}</p>
    </div>
    <div class="role" @click="() => onChangeRole('admin')">
      <h3>{{ $t.changeRoles.admin }}</h3>
      <p>{{ $t.changeRoles.adminText }}</p>
    </div>
    <div class="role" @click="() => onChangeRole('moderator')">
      <h3>{{ $t.changeRoles.moderator }}</h3>
      <p>{{ $t.changeRoles.moderatorText }}</p>
    </div>
  </UIAsidePopup>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useEmployeesStore } from '~/stores/EmployeesController';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { useUserStore } from '~/stores/UserController';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  active: boolean;
}>();

/**
 * Переменные ----------------
 */
const employeesController = useEmployeesStore();
const teamController = useTeamStore();
const userController = useUserStore();
const $t = await useTranslate('employees');

/**
 * Методы ----------------
 */
// Изменить роль пользователя
const onChangeRole = async (role: string) => {
  const { message } = await useCustomFetch(`team/employees/role/change`, {
    body: {
      team_id: teamController.activeTeamId,
      user_id: employeesController.user.id,
      role,
    },
    method: 'POST',
  });

  if (message) {
    employeesController.closeRoles();
    employeesController.setSuccessMessage($t.changeRoles.successMessage);
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.role {
  &:not(:last-child) {
    margin-bottom: 25px;
  }
  padding: 25px;
  border-radius: 3px;
  border: 1px solid $blue3;
  transition: 0.3s;
  cursor: pointer;
  h3 {
    color: $blue;
    margin-bottom: 10px;
  }
  &:hover {
    border-color: $blue;
  }
}
</style>
