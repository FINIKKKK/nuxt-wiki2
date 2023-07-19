<template>
  <UIAsidePopup
    title="Change access level"
    :isOpen="props.active"
    @close="employeesController.closeRoles()"
  >
    <p class="text">
      There are several access levels for user interaction with the itl.wiki
      workspace.
    </p>
    <div class="role" @click="() => onChangeRole('user')">
      <h3>User</h3>
      <p>
        The only people on your team who can add new members and edit settings.
      </p>
    </div>
    <div class="role" @click="() => onChangeRole('admin')">
      <h3>Administrator</h3>
      <p>
        The only people on your team who can add new members and edit settings.
        If you create a workspace and are on a team or corporate plan, you
        automatically become an admin and can add more people as fellow admins,
        members, or guests.
      </p>
    </div>
    <div class="role" @click="() => onChangeRole('moderator')">
      <h3>Moderator</h3>
      <p>
        The only people on your team who can add new members and edit settings.
      </p>
    </div>
  </UIAsidePopup>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useEmployeesStore } from '~/stores/EmployeesController';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';

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

  if(message) {
    employeesController.closeRoles()
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
