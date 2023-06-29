<template>
  <div class="access" :class="{ active: props.active }">
    <h2 class="title">Права доступа</h2>
    <p class="text">
      itl.wiki создана для совместной работы, делитесь контентом, который вы
      создаете, с вашей командой.
    </p>

    <div class="field" ref="fieldRef">
      <UIInput
        label="Введите имя пользователя"
        v-model="inputValue"
        @click="isShowList = true"
      />
      <ul class="list" v-if="isShowList">
        <li
          class="item"
          v-for="employee in employees"
          @click="addEmployeesAccess(employee)"
        >
          <img :src="employee.picture" alt="avatar" />
          <p>{{ employee?.fullname }}</p>
        </li>
      </ul>
    </div>

    <ul class="employees">
      <li class="employee" v-for="ability in model">
        <div class="info">
          <p class="name">{{ ability?.user.fullname }}</p>
          <p class="email">{{ ability?.user.email }}</p>
        </div>
        <UISelect
          class="select"
          :options="accessArr"
          v-model="ability.permission"
          type="triangle"
        />
      </li>
    </ul>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { TUser } from '~/utils/types/account';
import { TEmployees } from '~/utils/types/team';
import { useOutsideClick } from '~/hooks/useOutsideClick';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  modelValue: any;
  active: boolean;
}>();

/**
 * События ----------------
 */
const emits = defineEmits(['update:modelValue']);

// Значение
const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits('update:modelValue', val);
  },
});
const fieldRef = ref(null); //

const teamController = useTeamStore(); // Хранилище команд

// Пользователи
const { data } = await useCustomFetch<TEmployees>('team/employees', {
  query: { team_id: teamController.activeTeamId },
});
const inputValue = ref(''); //
const isShowList = ref(false); //
const employees = ref(data.value.employees);

useOutsideClick(fieldRef, isShowList);

const employeesAccess = ref<TUser[]>([]); //
const accessArr = [
  { value: 1, label: 'Полный доступ' },
  { value: 2, label: 'чтение и редактирование' },
  { value: 3, label: 'только чтение' },
  { value: 4, label: 'без доступа' },
];

watch(inputValue, () => {
  employees.value = data.value.employees.filter((obj) =>
    obj.fullname.toLowerCase().includes(inputValue.value.toLowerCase()),
  );
});
const setShowList = (value: boolean) => {
  isShowList.value = value;
};
const addEmployeesAccess = (value: TUser) => {
  employeesAccess.value.push(value);
  model.value.push({ permission: accessArr[0], user: value });
  isShowList.value = false;
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.access {
  position: fixed;
  right: 0;
  top: 0;
  background-color: $white;
  padding: 50px 35px;
  min-height: 100vh;
  overflow: auto;
  width: 400px;
  z-index: 100;
  box-shadow: 0 0 10px rgba($blue, 0.3);
  transform: translateX(100%);
  transition: 0.3s;
  &.active {
    transform: translateX(0);
  }
  .title {
    font-size: 24px;
    margin-bottom: 25px;
  }
  .text {
    margin-bottom: 25px;
  }
}

.field {
  position: relative;
  margin-bottom: 25px;
}

.list {
  position: absolute;
  background-color: $white;
  padding: 20px;
  box-shadow: 0 0 10px rgba($blue, 0.15);
  width: 100%;
  left: 0;
  top: 75px;
  .item {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 10px;
    img {
      width: 40px;
      height: 40px;
      margin-right: 25px;
    }
    p {
    }
    &:hover {
      background-color: rgba($blue, 0.1);
    }
  }
}

.employee {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba($black, 0.2);
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  .email {
    color: $gray;
    font-size: 14px;
  }
  .select {
    width: 150px;
  }
}
</style>
