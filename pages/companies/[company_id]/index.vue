<template></template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
definePageMeta({
  middleware: (to, from) => {
    return navigateTo(`${to.fullPath}/activity`);
  },
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
