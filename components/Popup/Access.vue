<template>
  <Popup
    :title="$t.accessPopup.title"
    :isOpen="props.isOpen"
    @close="emits('close')"
  >
    <p class="text">{{ $t.accessPopup.text }}</p>

    <div class="field" ref="refEmployees">
      <!-- Поле поиска пользователей -->
      <UIInput
        :label="$t.accessPopup.input"
        v-model="inputValue"
        @click="isShowList = !isShowList"
        @input="onSearchUser"
      />

      <!-- Список работников для выборки -->
      <ul class="list" v-if="isShowList">
        <User
          v-for="employee in employeesSearch"
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
          class="select"
          :label="$t.accessPopup.select"
          :options="accessArrEdit"
          v-model="ability.permission"
          type="access"
        />
      </li>
    </ul>
  </Popup>
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
import { useUserStore } from '~/stores/UserController';
import { useOutsideClick } from '~/hooks/useOutsideClick';
import debounce from 'lodash.debounce';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  modelValue: TAbility[];
  isOpen: boolean;
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
const emits = defineEmits(['update:modelValue', 'close']);

/**
 * Переменные ----------------
 */
const teamController = useTeamStore();
const createElemController = useCreateElemStore();
const userController = useUserStore();
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
const refEmployees = ref(null);
const employeesSearch = ref([]);

/**
 * Хуки ----------------
 */
useOutsideClick(refEmployees, isShowList);

/**
 * Получение данных ----------------
 */
// Работники
const { data } = await useCustomFetch<TEmployees>('team/employees', {
  query: { team_id: teamController.activeTeamId },
});
employees.value = data.employees.filter(
  (obj: TUser) => obj.id !== userController.user?.id,
);
employeesSearch.value = employees.value;

/**
 * Вычисляемое ----------------
 */
// Сортировать список работников при поиске
watch(inputValue, () => {
  employees.value = data.value.employees.filter((obj: TUser) =>
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

// Поиск пользователя
const onSearchUser = debounce(async () => {
  if (inputValue.value) {
    employeesSearch.value = employees.value.filter((obj) =>
      obj.fullname.toLowerCase().includes(inputValue.value.toLowerCase()),
    );
  } else {
    employeesSearch.value = employees.value;
  }
}, 250);
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
  .select {
    width: 140px;
    margin-bottom: 0;
  }
}
</style>
