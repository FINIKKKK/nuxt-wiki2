<template>
  <div class="tabs__flex">
    <div class="field">
      <!-- Поле ввода -->
      <input
        v-model="tabNameValue"
        type="text"
        placeholder="Добавить вкладку"
        @keydown.enter="addTab"
        maxlength="100"
      />
    </div>

    <!-- Вкладки -->
    <ul class="tabs">
      <li
        v-for="(tab, index) in createElemController.tabs"
        :key="index"
        :class="{ active: activeTab === index }"
        @click="activeTab = index"
      >
        {{ tab.name }}
      </li>
    </ul>
  </div>

  <!-- Поля Editor -->
  <div class="body">
    <template v-for="(tab, index) in createElemController.tabs">
      <div class="input" v-if="activeTab === index">
        <Editor class="editor" v-model="tab.content" />
      </div>
    </template>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCreateElemStore } from '~/stores/CreateElemController';

/**
 * Системные переменные ----------------
 */
const createElemController = useCreateElemStore(); // Хранилище страницы создания

/**
 * Пользовательские переменные ----------------
 */
const activeTab = ref(0); // Активная вкладка
const tabNameValue = ref(''); // Значение поле ввода

/**
 * Полльзовательские переменные ----------------
 */
// Добавить вкладку
const addTab = () => {
  if (tabNameValue.value) {
    createElemController.addTab({ name: tabNameValue.value, content: [] });
    tabNameValue.value = '';
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.tabs__flex {
  margin-bottom: 40px;
}

.tabs {
  width: 100%;
  overflow: auto;
  display: flex;
  align-items: center;
  margin-top: 25px;
  &::-webkit-scrollbar {
    height: 2px;
  }
  li {
    border-bottom: 1px solid $gray;
    text-transform: uppercase;
    padding: 5px 15px;
    border-radius: 5px 5px 0 0;
    cursor: pointer;
    font-size: 13px;
    color: $gray;
    &.active {
      color: $blue;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        background-color: $blue;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
      }
    }
  }
}

.field {
  input {
    &::placeholder {
      color: $gray;
    }
  }
}

.editor {
  border-radius: 10px;
}
</style>
