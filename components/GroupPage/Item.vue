<template>
  <tr class="item">
    <th>{{ props.data.id }}</th>
    <th>{{ props.data.fullname }}</th>
    <th>{{ props.data.email }}</th>
    <th>
      {{
        props.data.logged_in
          ? useFormatDate(props.data.logged_in, userController.lang)
          : '-'
      }}
    </th>
    <th class="controls" tabindex="1" @blur="isShowPopup = false">
      <template v-if="userController.user?.id !== props.data.id">
        <i
          class="fa-regular fa-ellipsis-h"
          @click="isShowPopup = !isShowPopup"
        />
        <ul class="popup" v-if="isShowPopup">
          <li @click="onRemoveFromGroup">
            <i class="fa-regular fa-cancel" />
            <p>{{ $t.table.remove }}</p>
          </li>
        </ul>
      </template>
    </th>
  </tr>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { TUser } from '~/utils/types/account';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { useUserStore } from '~/stores/UserController';
import { useFormatDate } from '~/hooks/useFormatData';
import { useGroupStore } from '~/stores/GroupController';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  data: TUser;
}>();

/**
 * Переменные ----------------
 */
const isShowPopup = ref(false);
const teamController = useTeamStore();
const userController = useUserStore();
const groupController = useGroupStore();
const $t = await useTranslate('groups');
const route = useRoute();

/**
 * Методы ----------------
 */
// Удалить пользователя из команды
const onRemoveFromGroup = async () => {
  if (window.confirm($t.table.confirm)) {
    const { message } = await useCustomFetch(`team/groups/employees/delete`, {
      body: {
        team_id: teamController.activeTeamId,
        group_id: route.params.id,
        users: [props.data.id],
      },
      method: 'POST',
    });
    if (message) {
      groupController.removeUser(props.data.id);
      isShowPopup.value = false;
    }
  } else {
    isShowPopup.value = false;
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.item {
  transition: 0.2s;
  &:hover {
    background-color: $white;
    .controls .fa-ellipsis-h {
      opacity: 1;
    }
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
    opacity: 0;
    transition: 0.2s;
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
