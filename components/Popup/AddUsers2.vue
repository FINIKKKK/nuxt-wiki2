<template>
  <Popup :title="$t.group.popup" :isOpen="props.isOpen" @close="emits('close')">
    <div class="field" ref="refPopup">
      <!-- Поле поиска пользователей -->
      <UIInput
        :label="$t.group.popup_input"
        v-model="inputValue"
        @click="isShowList = !isShowList"
        @input="onSearchUser"
      />

      <!-- Список работников для выборки -->
      <ul class="list" v-if="isShowList">
        <User
          v-for="user in usersSearch"
          :key="user.id"
          :data="user"
          @click="addUser(user)"
        />
      </ul>
    </div>

    <!-- Список пользователей -->
    <ul class="users">
      <User v-for="user in users" :key="user.id" :data="user" class="user" />
    </ul>

    <!-- Кнопка для добаволения пользователей в группу -->
    <div class="footer" v-if="users.length">
      <button class="btn" @click="onAddUsersToGroup">{{ $t.group.add }}</button>
    </div>
  </Popup>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { TUser } from '~/utils/types/account';
import { TEmployees } from '~/utils/types/team';
import { useUserStore } from '~/stores/UserController';
import { useOutsideClick } from '~/hooks/useOutsideClick';
import { useDebounce } from '~/hooks/useDebounce';
import { useElemStore } from '~/stores/ElemController';
import { useGroupStore } from '~/stores/GroupController';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  isOpen: boolean;
}>();

/**
 * События ----------------
 */
const emits = defineEmits(['close']);

/**
 * Переменные ----------------
 */
const teamController = useTeamStore();
const elemController = useElemStore();
const userController = useUserStore();
const inputValue = ref('');
const isShowList = ref(false);
const $t = await useTranslate('groups');
const refPopup = ref(null);
const usersSearch = ref<TUser[]>([]);
const users = ref<TUser[]>([]);
const groupController = useGroupStore();
const route = useRoute();

/**
 * Хуки ----------------
 */
useOutsideClick(refPopup, isShowList);

/**
 * Вычисляемое ----------------
 */
// Отсортированные пользователи, которых нет в группе
const filterUsers = computed(() => {
  return teamController.teamEmployees?.filter(
    (obj) => !groupController.users.some((obj2) => obj.id === obj2.id),
  );
});
// Сортировать поиск
watch(
  () => groupController.users,
  () => {
    usersSearch.value = filterUsers.value || [];
  },
);

/**
 * Получение данных ----------------
 */
// Работники
if (!teamController.employees) {
  const { data: employees } = await useCustomFetch<TEmployees>(
    'team/employees',
    {
      query: {
        team_id: teamController.activeTeamId,
        limit: 15,
        offset: 0,
        order_by: 'created_at',
        order_sort: 'DESC',
      },
    },
  );
  teamController.setEmployees(employees);
} else {
  usersSearch.value = filterUsers.value || [];
}

/**
 * Методы ----------------
 */
// Добавить пользователя в область редактирования доступа
const addUser = (value: TUser) => {
  const findUser = users.value.find((obj) => obj.id === value.id);
  // Если этого работника нет в массиве
  if (!findUser) {
    // Добавляем в массив
    users.value.push(value);
    // Закрываем список
    isShowList.value = false;
  } else {
    // Закрываем список
    isShowList.value = false;
  }
};

// Поиск пользователя
const onSearchUser = useDebounce(async () => {
  if (inputValue.value && filterUsers.value) {
    usersSearch.value = filterUsers.value?.filter((obj) =>
      obj.fullname.toLowerCase().includes(inputValue.value.toLowerCase()),
    );
  } else {
    if (filterUsers.value) usersSearch.value = filterUsers.value;
  }
}, 250);

// Добавить пользователей в группу
const onAddUsersToGroup = async () => {
  // Данные
  const dto = {
    team_id: teamController.activeTeamId,
    users: users.value.map((obj) => obj.id),
    group_id: route.params.id,
  };

  // Добавить пользователей в группу
  const { data } = await useCustomFetch(`team/groups/employees/add`, {
    body: dto,
    method: 'POST',
  });

  if (data) {
    groupController.closeAddUsers();
    groupController.addUsers(users.value);
    users.value = [];
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.field {
  position: relative;
  margin-bottom: 25px;
}

.list {
  user-select: none;
  position: absolute;
  background-color: $white;
  padding: 15px;
  box-shadow: 0 0 10px rgba($blue, 0.15);
  width: 100%;
  left: 0;
  top: 75px;
  z-index: 50;
}

.footer {
  position: absolute;
  bottom: 0px;
  left: 0;
  background-color: $white;
  padding: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
  .btn {
    min-width: 70%;
  }
}
</style>

<style lang="scss">
.users {
  .user {
    pointer-events: none;
    border-bottom: 1px solid $blue3;
    padding: 15px;
  }
}
</style>
