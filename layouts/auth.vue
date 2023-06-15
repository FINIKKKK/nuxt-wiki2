<template>
  <main>
    <div class="content">
      <img class="logo" src="@/assets/img/svg/full_logo.svg" alt="logo">

      <!-- Слот -->
      <slot/>
    </div>
  </main>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
main {
  background-image: url("@/assets/img/bg.png");
}

.content {
  min-height: 100vh;
  width: 45%;
  background-color: $white;
  padding: 48px 135px 160px;
  margin-left: auto;
}

.logo {
  width: 135px;
  margin-bottom: 109px;
}
</style>
