<template>
  <main>
    <!-- Сайдбар -->
    <Sidebar/>

    <!-- Остальной контент на странице -->
    <div id="scroll" class="content">
      <!-- Заголовок -->
      <h1 class="title" v-if="props.title">{{ props.title }}</h1>

      <!-- Слот шаблона -->
      <slot/>
    </div>
  </main>
</template>

<script lang="ts" setup>

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  title?: string;
}>();
</script>

<style lang="scss" scoped>
main {
  position: relative;
  display: flex;
}

.content {
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 46px 36px;
  overflow: auto;
}

.title {
  font-size: 24px;
  margin-bottom: 60px;
  span:nth-child(1) {
    color: $black;
  }
  span:not(:last-child) {
    position: relative;
    padding-right: 32px;
    margin-right: 20px;
    &::after {
      //content: url('~/assets/img/arrow.svg');
      position: absolute;
      transform: translateY(-50%);
      top: 50%;
      right: 0;
    }
  }
}
</style>
