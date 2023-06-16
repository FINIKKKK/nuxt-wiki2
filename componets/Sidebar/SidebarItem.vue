<template>
  <template v-if="!props.type">
    <li
      class="item"
    >
      <NuxtLink v-if="props.data.link" :to="props.data.link">
        <svg-icon :name="props.data.icon" />
        <p>{{ props.data.label }}</p>
      </NuxtLink>
      <a v-else @click="props.data.method">
        <svg-icon :name="props.data.icon" />
        <p>{{ props.data.label }}</p>
      </a>
    </li>
  </template>

<!--  <template v-if="props.type">-->
<!--    <li class="item" :class="{ post: props.type === 'post' }">-->
<!--      <NuxtLink :to="itemLink">-->
<!--        <svg-icon v-if="props.type === 'section'" name="folder" />-->
<!--        <p>{{ props.data.title }}</p>-->
<!--      </NuxtLink>-->
<!--    </li>-->
<!--  </template>-->
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
// import { useCompanyStore } from '~/stores/CompanyStore';
// import { TSection } from '~/api/models/section/types';
// import { TPost } from '~/api/models/post/types';

/**
 * Типы ----------------
 */
export type TItem = {
  icon: string;
  label: string;
  link?: string;
  method?: void;
  isShow?: boolean;
};

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  data: TItem;
  type?: 'post' | 'section';
}>();

/**
 * Системные переменные ----------------
 */
// const companyStore = useCompanyStore(); // Хранилище активной компании

/**
 * Вычисляемые значения ----------------
 */
// Ссылка на элемент
// const itemLink = computed(() => {
//   return `${companyStore.activeCompanySlug}/${
//     props.type === 'section' ? 'sections' : 'posts'
//   }/${props.data.id}`;
// });
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.item {
  transition: 0.3s;
  margin-left: -16px;
  cursor: pointer;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
  a {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    border-radius: 3px;
  }
  svg {
    width: 22px;
    height: 22px;
    margin-right: 15px;
    fill: $blue;
    flex: 0 0 auto;
  }
  p {
    font-size: 14px;
    line-height: 20px;
    color: $black;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: 0.3s;
  }
  &:hover {
    background-color: $blue;
    a {
      text-decoration: none;
    }
    p {
      color: $blue;
    }
    &.post {
      a::before {
        background-color: $blue;
      }
    }
  }
  &.post {
    a::before {
      content: '';
      width: 5px;
      height: 5px;
      border-radius: 50%;
      margin-right: 10px;
      background-color: $black;
      flex: 0 0 auto;
      transition: 0.3s;
    }
  }
}
</style>
