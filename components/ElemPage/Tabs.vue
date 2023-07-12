<template>
  <div class="content">
    <div class="tabs__wrapper">
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

      <div class="body" v-for="(tab, index) in props.tabs">
        <EditorBody
          :key="index"
          :data="JSON.parse(tab.content)"
          v-if="index === activeTab"
        />
      </div>
    </div>

    <template v-for="(tab, index) in props.tabs">
      <div class="map" v-if="index === activeTab">
        <div class="caption">
          <svg-icon name="hamburger2" />
          <p>Содержание</p>
        </div>
        <a
          :href="`#${item.id}`"
          v-for="item in JSON.parse(tab.content).filter(
            (obj) => obj.type === 'header',
          )"
          :key="item.id"
          class="item"
          :class="{ child: item.data.level === 3 }"
        >
          <svg-icon name="minus" v-if="item.data.level === 3" />
          <p>
            {{ item.data.text }}
          </p>
        </a>
      </div>
    </template>
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
.tabs__wrapper {
  width: 80%;
}

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
  position: relative;
  display: flex;
  align-items: flex-start;
}

.map {
  margin-left: 87px;
  width: 300px;
  position: sticky;
  right: 0;
  top: 0;
  font-size: 14px;
  color: $gray;
  padding-left: 32px;
  border-left: 1px solid rgba($gray, 0.3);
  user-select: none;
  .caption {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    svg {
      fill: $gray;
      width: 15px;
      height: 15px;
      margin-right: 10px;
    }
  }
  .item {
    cursor: pointer;
    text-decoration: none;
    color: $gray;
    display: flex;
    align-items: center;
    &:not(:last-child) {
      margin-bottom: 5px;
    }
    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &.child {
      svg {
        width: 8px;
        height: 8px;
        margin-right: 10px;
        fill: $gray;
      }
    }
    &:hover {
      color: $blue;
      svg {
        fill: $blue;
      }
    }
  }
}
</style>
