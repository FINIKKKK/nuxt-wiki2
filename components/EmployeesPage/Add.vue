<template>
  <div class="aside-popup">
    <h3 class="title">Add employee</h3>
    <p class="text">
      The main strengths of itl.wiki are revealed when you work in conjunction
      with other team members and discuss projects.
    </p>
    <UIInput
      label="Enter user e-mail addresses separated by commas"
      v-model="emailsValue"
      :errors="[]"
    />
    <button>Add</button>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>

/**
 * Переменные ----------------
 */
const emailsValue = ref('');

/**
 * Методы ----------------
 */

</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
