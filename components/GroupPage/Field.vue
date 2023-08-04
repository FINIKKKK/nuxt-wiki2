<template>
  <div class="field">
    <div class="input">
      <i class="fa-regular fa-search" />
      <input
        type="text"
        :placeholder="$t.group.search"
        v-model="searchValue"
        @input="onSearchUsers"
      />
    </div>

    <div class="btn" @click="groupController.openAddUsers()">
      <i class="fa-regular fa-plus" />
      <p>{{ $t.group.add }}</p>
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useGroupStore } from '~/stores/GroupController';
import { useDebounce } from '~/hooks/useDebounce';

/**
 * Переменные ----------------
 */
const searchValue = ref('');
const groupController = useGroupStore();
const $t = await useTranslate('groups');

/**
 * Методы ----------------
 */
// Поиск соотрудрников
const onSearchUsers = useDebounce(async () => {
  // if (searchValue.value) {
  // const { data } = await useCustomFetch<TSearchData>(`team/search`, {
  //   query: {
  //     team_id: teamController.activeTeamId,
  //     query: searchValue.value,
  //     type: 'all',
  //   },
  // });
  //   if (data) {
  //     searchData.value = data.results;
  //   }
  // } else {
  //   searchData.value = null;
  // }
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
    white-space: nowrap;
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
