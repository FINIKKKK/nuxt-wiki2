<template>
  <div
    class="access aside-popup"
    :class="{
      active: createElemController.isShowAccess || elemController.isShowAccessPopup,
    }"
  >
    <h2 class="title">Права доступа</h2>
    <p class="text">
      itl.wiki создана для совместной работы, делитесь контентом, который вы
      создаете, с вашей командой.
    </p>

    <div class="field" ref="fieldRef">
      <!-- Поле поиска пользователей -->
      <UIInput
        label="Введите имя пользователя"
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
      <li class="employee" v-for="ability in createElemController.abilities">
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
import { accessArr } from '~/utils/data';
import { useCreateElemStore } from '~/stores/CreateElemController';
import { useElemStore } from '~/stores/ElemController';

/**
 * Переменные ----------------
 */
const teamController = useTeamStore();
const createElemController = useCreateElemStore();
const elemController = useElemStore();

/**
 * Получение данных ----------------
 */
// Работники
const { data } = await useCustomFetch<TEmployees>('team/employees', {
  query: { team_id: teamController.activeTeamId },
});

/**
 * Полльзовательские переменные ----------------
 */
const fieldRef = ref(null); // Ref-ссылка на элемент
const inputValue = ref(''); // Значение поля ввода
const isShowList = ref(false); // Показывать список?
const employees = ref<TUser[]>(data.value.employees); // Список работников
const employeesAccess = ref<TUser[]>([]); // Список работников в области редактирования

/**
 * Хуки ----------------
 */
// Для закрытия попапа, если клик был вне его области
// useOutsideClick(fieldRef, isShowList);

/**
 * Следить за переменными ----------------
 */
// Сортировать список работников при поиске
watch(inputValue, () => {
  employees.value = data.value.employees.filter((obj) =>
    obj.fullname.toLowerCase().includes(inputValue.value.toLowerCase()),
  );
});

/**
 * Хуки ----------------
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
  }
}
</style>
