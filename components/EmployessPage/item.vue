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
        <li>
          <svg-icon name="key" />
          <p>Изменить уровень доступа</p>
        </li>
        <li>
          <svg-icon name="close" />
          <p>Удалить из компании</p>
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

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  data: TUser;
  type?: 'invite';
}>();

/**
 * Переменные ----------------
 */
const isShowPopup = ref(false);
const refPopup = ref(null);

/**
 * Хуки ----------------
 */
useOutsideClick(refPopup, isShowPopup);
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
    width: 220px;
    top: 35px;
    right: 10px;
  }
}
</style>
