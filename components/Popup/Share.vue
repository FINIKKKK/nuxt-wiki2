<template>
  <AsidePopup title="Публичный доступ" :isOpen="props.active" @close="emits('close')">

  </AsidePopup>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import AsidePopup from '~/components/Popup/AsidePopup.vue';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  active: boolean;
  modelValue: any;
}>();

/**
 * События ----------------
 */
const emits = defineEmits(['update:modelValue', 'close']);

// Значение
const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits('update:modelValue', val);
  },
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
