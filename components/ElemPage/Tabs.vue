<template>
  <ul class="tabs" v-if="props.tabs.length !== 1">
    <li
      class="tab"
      v-for="(tab, index) in props.tabs"
      :key="index"
      @click="activeTab = index"
      :class="{ active: index === activeTab }"
    >
      {{ tab.name }}
    </li>
  </ul>

  <div class="content" v-for="(tab, index) in props.tabs">
    <EditorBody :key="index" :data="JSON.parse(tab.content)" v-if="index === activeTab" />
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { TTabParse } from '~/utils/types/article';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  tabs: TTabParse[];
}>();

/**
 * Полльзовательские переменные ----------------
 */
const activeTab = ref(0); // Активная вкладка
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.tabs {
  display: flex;
  align-items: center;
  border: 1px solid rgba($blue, 0.2);
  padding: 0 20px;
  border-radius: 2px;
  margin-bottom: 45px;
  .tab {
    padding: 12px 15px;
    border-radius: 5px 5px 0 0;
    cursor: pointer;
    color: $gray;
    border-bottom: 1px solid transparent;
    &.active {
      color: $blue;
      border-bottom: 1px solid $blue;
    }
  }
}

.content {
  margin-bottom: 45px;
}
</style>
