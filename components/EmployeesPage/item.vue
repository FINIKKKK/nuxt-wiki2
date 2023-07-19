<template >
  <tr class="item" >
    <th>{{ props.data.id }}</th>
    <th>{{ props.data.fullname ? props.data.fullname : '-' }}</th>
    <th>{{ props.data.email }}</th>
    <th>
      {{ props.data.logged_in ? useFormatDate(props.data.logged_in) : '-' }}
    </th>
    <th>
      {{ props.type === 'invite' ? 'Приглашен(a)' : 'Выдан статус' }}
    </th>
    <th>-</th>
    <th class="controls" tabindex="1" @blur="isShowPopup = false">
      <i class="fa-regular fa-ellipsis-h" @click="isShowPopup = !isShowPopup" />
      <ul class="popup" v-if="isShowPopup">
        <li class="key" @click="onOpenRolesPopup" ref="refBtn" >
          <i class="fa-regular fa-key" />
          <p>Изменить уровень доступа</p>
        </li>
        <li @click="onRemoveFromTeam" v-if="props.type !== 'invite'">
          <i class="fa-regular fa-cancel" />
          <p>Удалить из компании</p>
        </li>
        <li @click="onCancelInvite" v-if="props.type === 'invite'">
          <i class="fa-regular fa-cancel" />
          <p>Отменить приглашение</p>
        </li>
      </ul>
    </th>
  </tr>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useFormatDate } from '~/hooks/useFormatData';
import { TUser } from '~/utils/types/account';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { useEmployeesStore } from '~/stores/EmployeesController';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  data: TUser;
  type?: 'invite';
}>();

/**
 * События ----------------
 */
const emits = defineEmits(['removeFromTeam', 'removeFromInvites']);

/**
 * Переменные ----------------
 */
const isShowPopup = ref(false);
const refPopup = ref(null);
const teamController = useTeamStore();
const employeesController = useEmployeesStore();
const refBtn = ref(null);

onMounted(() => {
  employeesController.setRefBtn(refBtn.value);
});

/**
 * Хуки ----------------
 */
// useOutsideClick(refPopup, isShowPopup);

/**
 * Методы ----------------
 */
// Удалить пользователя из команды
const onRemoveFromTeam = async () => {
  if (window.confirm('Вы точно хотите удалить пользователя из компании?')) {
    const { data } = await useCustomFetch(`team/employees/dismiss`, {
      body: { team_id: teamController.activeTeamId, user_id: props.data.id },
      method: 'POST',
    });
    emits('removeFromTeam', props.data.id);
    isShowPopup.value = false;
  } else {
    isShowPopup.value = false;
  }
};
// Отменить приглашение
const onCancelInvite = async () => {
  if (window.confirm('Вы точно хотите отменить приглашение?')) {
    const { data } = await useCustomFetch(`team/invites/delete`, {
      body: { team_id: teamController.activeTeamId, invite_id: props.data.id },
      method: 'POST',
    });
    emits('removeFromInvites', props.data.id);
    isShowPopup.value = false;
  } else {
    isShowPopup.value = false;
  }
};
// Открыть попап
const onOpenRolesPopup = () => {
  isShowPopup.value = false;
  employeesController.openRoles();
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.item {
  height: 64px;
  transition: 0.2s;
  th {
    padding: 12px 16px;
  }
  &:hover {
    background-color: $white;
  }
}

.controls {
  position: relative;
  .fa-ellipsis-h {
    width: 35px;
    height: 35px;
    transform: rotate(90deg);
    cursor: pointer;
    border-radius: 50%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: $blue3;
    }
  }
  .popup {
    width: 250px;
    top: 35px;
    right: 10px;
  }
}
</style>