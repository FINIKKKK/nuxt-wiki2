<template>
  <div class="content">
    <div class="tabs__wrapper">
      <ul class="tabs" v-if="props.tabs.length !== 1">
        <li
          class="tab"
          v-for="(tab, index) in props.tabs"
          :key="index"
          @click="elemController.setActiveTab(index, tab.id)"
          :class="{ active: index === elemController.activeTab.index }"
        >
          {{ tab.name }}
        </li>
      </ul>

      <div class="body" v-for="(tab, index) in props.tabs">
        <EditorBody
          :key="index"
          :data="JSON.parse(tab.content)"
          v-if="index === elemController.activeTab.index"
          :comments="elemController.article.article.tabs[index].comments"
        />
      </div>
    </div>

    <template v-for="(tab, index) in props.tabs" v-if="!isHistory">
      <div
        class="map"
        v-if="
          index === elemController.activeTab.index &&
          JSON.parse(tab.content).filter((obj: OutputBlockData) => obj.type === 'header')?.length
        "
      >
        <a href="#title" class="caption">
          <i class="fa-regular fa-align-left" />
          <p>{{ $t.titles }}</p>
        </a>
        <a
          :href="`#${item.id}`"
          v-for="item in JSON.parse(tab.content).filter(
            (obj: OutputBlockData) => obj.type === 'header',
          )"
          :key="item.id"
          class="item"
          :class="{
            child: item.data.level === 3,
            active: elemController.activeTitle === item.id,
          }"
        >
          <i class="fa-regular fa-minus" v-if="item.data.level === 3" />
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
import { OutputBlockData } from '@editorjs/editorjs';
import { useElemStore } from '~/stores/ElemController';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  tabs: TTabParse[];
  isHistory?: boolean;
}>();

/**
 * События ----------------
 */
const emits = defineEmits(['activeTab']);

/**
 * Переменные ----------------
 */
const $t = await useTranslate('elem');
const elemController = useElemStore();

/**
 * Вычисляемое ----------------
 */
elemController.setActiveTab(0, props.tabs[0].id);
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
    color: $gray;
    text-decoration: none;
    i {
      color: $gray;
      width: 15px;
      height: 20px;
      margin-right: 10px;
    }
    &:hover {
      color: $blue;
      i {
        color: $blue;
      }
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
      i {
        width: 8px;
        height: 20px;
        margin-right: 15px;
        color: $gray;
      }
    }
    &:hover {
      color: $blue;
      i {
        color: $blue;
      }
    }
    &.active {
      color: $blue;
      i {
        color: $blue;
      }
      position: relative;
      &::before {
        content: '';
        position: absolute;
        height: 100%;
        width: 1px;
        background-color: $blue;
        left: -32px;
      }
    }
  }
}
</style>
