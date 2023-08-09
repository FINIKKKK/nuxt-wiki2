<template>
  <div class="tabs__flex">
    <div class="field">
      <!-- Поле ввода -->
      <input
        v-model="tabNameValue"
        type="text"
        :placeholder="$t.tab"
        @keydown.enter="addTab"
        maxlength="100"
      />
      <i class="fa-regular fa-add" @click="addTab" v-if="tabNameValue" />
    </div>

    <!-- Вкладки -->
    <ul class="tabs">
      <li
        v-for="(tab, index) in createElemController.tabs"
        :key="index"
        :class="{ active: createElemController.activeTab === index }"
      >
        <p
          v-if="editTab !== index"
          @click="createElemController.setActiveTab(index)"
        >
          {{ tab.name }}
        </p>
        <input
          v-if="editTab === index"
          type="text"
          v-model="editTabValue"
          :placeholder="$t.tab2"
          @keydown.enter="() => setEditTab(index)"
          maxlength="100"
        />
        <div class="controls">
          <i
            class="fa-regular fa-pen"
            @click="editTab = index"
            v-if="editTab !== index"
          />
          <i
            class="fa-regular fa-pen"
            @click="() => setEditTab(index)"
            v-if="editTab === index && editTabValue"
          />
          <i
            class="fa-regular fa-remove"
            v-if="editTab === index"
            @click="editTab = null"
          />
          <i class="fa-regular fa-trash" @click="() => onRemoveTab(index)" />
        </div>
      </li>
    </ul>
  </div>

  <!-- Поля Editor -->
  <div class="body">
    <template v-for="(tab, index) in createElemController.tabs">
      <div class="input" v-if="createElemController.activeTab === index">
        <Editor class="editor" v-model="tab.content" :label="$t.body" />
      </div>
    </template>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCreateElemStore } from '~/stores/CreateElemController';

/**
 * Переменные ----------------
 */
const createElemController = useCreateElemStore();
const tabNameValue = ref('');
const addTab = () => {
  if (tabNameValue.value) {
    createElemController.addTab({
      name: tabNameValue.value,
      content: [],
      comments: [],
    });
    tabNameValue.value = '';
  }
};
const $t = await useTranslate('create_elem');
const editTab = ref<number | null>(null);
const editTabValue = ref('');

/**
 * Методы ----------------
 */
const setEditTab = (index: number) => {
  createElemController.editTab(index, editTabValue.value);
  editTab.value = null;
  editTabValue.value = '';
};

const onRemoveTab = (index: number) => {
  if (window.confirm($t.tab_confirm)) {
    createElemController.removeTab(index);
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
  margin-top: 25px;
  width: 100%;
  overflow: auto;
  display: flex;
  align-items: center;
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
    display: flex;
    align-items: center;
    .controls {
      margin-left: 15px;
    }
    input {
      text-transform: uppercase;
    }
    i {
      cursor: pointer;
      font-size: 12px;
      &:not(:last-child) {
        margin-right: 10px;
      }
      &.fa-remove {
        font-size: 17px;
      }
    }
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
  i {
    cursor: pointer;
  }
}

.editor {
  border-radius: 10px;
}
</style>
