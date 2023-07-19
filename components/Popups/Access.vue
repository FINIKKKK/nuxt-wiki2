<template>
  <UIAsidePopup
    :title="$t.accessPopup.title"
    @close="createElemController.closeAccess()"
  >
    <p class="text">{{ $t.accessPopup.text }}</p>

    <div class="field" tabindex="2" @blur="isShowList = false">
      <!-- Поле поиска пользователей -->
      <UIInput
        :label="$t.accessPopup.input"
        v-model="inputValue"
        @click="isShowList = true"
      />

      <!-- Список работников для выборки -->
      <ul class="list" v-if="isShowList">
        <User
          v-for="employee in employees"
          :key="employee.id"
          :data="employee"
          @click="addEmployeesAccess(employee)"
        />
      </ul>
    </div>

    <!-- Список работников для редактирования прав доступа -->
    <ul class="employees">
      <li class="employee" v-for="ability in model">
        <div class="info">
          <p class="name">{{ ability?.user.fullname }}</p>
          <p class="email">{{ ability?.user.email }}</p>
        </div>
        <UISelect
          class="employee_select"
          :options="accessArrEdit"
          v-model="ability.permission"
          type="access"
        />
      </li>
    </ul>
  </UIAsidePopup>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { TUser } from '~/utils/types/account';
import { TAbility, TEmployees } from '~/utils/types/team';
import { accessArr } from '~/utils/data';
import { useCreateElemStore } from '~/stores/CreateElemController';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  modelValue: TAbility[];
}>();

// Значение
const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits('update:modelValue', val);
  },
});

/**
 * События ----------------
 */
const emits = defineEmits(['update:modelValue']);

/**
 * Переменные ----------------
 */
const teamController = useTeamStore();
const createElemController = useCreateElemStore();
const inputValue = ref('');
const isShowList = ref(false);
const employeesAccess = ref<TUser[]>([]);
const employees = ref<TUser[]>([]);
const $t = await useTranslate('create_elem');
const $t2 = await useTranslate('data');
const accessArrEdit = accessArr.map((item) => ({
  value: item.value,
  label: $t2.access[item.label],
}));

/**
 * Получение данных ----------------
 */
// Работники
const { data } = await useCustomFetch<TEmployees>('team/employees', {
  query: { team_id: teamController.activeTeamId },
});
employees.value = data.employees;

/**
 * Вычисляемое ----------------
 */
// Сортировать список работников при поиске
watch(inputValue, () => {
  employees.value = data.value.employees.filter((obj) =>
    obj.fullname.toLowerCase().includes(inputValue.value.toLowerCase()),
  );
});

/**
 * Методы ----------------
 */
// Добавить работника в область редактирования доступа
const addEmployeesAccess = (value: TUser) => {
  const findUser = createElemController.abilities.find(
    (obj) => obj.user.id === value.id,
  );
  // Если этого работника нет в массиве
  if (!findUser) {
    employeesAccess.value.push(value);
    // Добавляем в массив
    createElemController.addAbility({ user: value, permission: accessArr[0] });
    model.value.push({ user: value, permission: accessArrEdit[0] });
    console.log(model.value);
    // Закрываем список
    isShowList.value = false;
  } else {
    // Закрываем список
    isShowList.value = false;
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
  .employee_select {
    width: 140px;
  }
}
</style>
