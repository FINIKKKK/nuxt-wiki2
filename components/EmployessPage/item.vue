<template>
  <tr class="item">
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
    <th class="controls" ref="refPopup">
      <svg-icon
        name="options"
        class="options"
        @click="isShowPopup = !isShowPopup"
      />
      <ul class="popup" v-if="isShowPopup">
        <li class="key">
          <svg-icon name="key" />
          <p>Изменить уровень доступа</p>
        </li>
        <li @click="onRemoveFromTeam" v-if="props.type !== 'invite'">
          <svg-icon name="cancel" />
          <p>Удалить из компании</p>
        </li>
        <li @click="onCancelInvite" v-if="props.type === 'invite'">
          <svg-icon name="cancel" />
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
import { useOutsideClick } from '~/hooks/useOutsideClick';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';

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

/**
 * Хуки ----------------
 */
useOutsideClick(refPopup, isShowPopup);

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
  .options {
    margin-bottom: -10px;
    width: 35px;
    height: 35px;
    transform: rotate(90deg);
    cursor: pointer;
    border-radius: 50%;
    padding: 10px;
    &:hover {
      background-color: $blue3;
    }
  }
  .popup {
    width: 250px;
    top: 35px;
    right: 10px;
    .key {
      svg {
        width: 17px;
        height: 17px;
      }
    }
  }
}
</style>
