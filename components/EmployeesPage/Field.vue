<template>
  <div class="field">
    <div class="input">
      <i class="fa-regular fa-search" />
      <input
        type="text"
        :placeholder="$t.search"
        v-model="searchValue"
        @input="onSearchUser"
      />
    </div>

    <div class="btn" @click="employeesController.openAddUsers()">
      <i class="fa-regular fa-plus" />
      <p>{{ $t.add }}</p>
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import debounce from 'lodash.debounce';
import { useEmployeesStore } from '~/stores/EmployeesController';

/**
 * Переменные ----------------
 */
const searchValue = ref('');
const employeesController = useEmployeesStore();
const $t = await useTranslate('employees');

/**
 * Методы ----------------
 */
// Поиск соотрудрников
const onSearchUser = debounce(async () => {
  employeesController.searchUser(searchValue.value);
}, 250);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.field {
  width: 100%;
  margin-bottom: 45px;
  display: flex;
  align-items: center;
  .input {
    display: flex;
    align-items: center;
    width: 100%;
    margin-right: 25px;
    background-color: $bg;
    padding: 12px 25px;
    input {
      width: 100%;
    }
    i {
      margin-right: 10px;
      color: $gray;
    }
  }
  .btn {
    display: flex;
    align-items: center;
    cursor: pointer;
    p {
      line-height: 16px;
    }
    i {
      height: 19px;
      color: $black;
      margin-right: 10px;
    }
  }
}
</style>
