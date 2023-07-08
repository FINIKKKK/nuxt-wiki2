<template>
  <div
    class="input"
    :class="{
      focus: isFocus || model,
    }"
  >
    <div class="inner">
      <!-- Поле ввода -->
      <label>
        {{ props.label }}
      </label>
      <textarea
        type="text"
        v-model="model"
        maxlength="250"
        @focus="isFocus = true"
        @blur="isFocus = false"
        ref="textareaRef"
      ></textarea>
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
/**
 * Пропсы ----------------
 */
const props = defineProps<{
  label: string;
  modelValue: string;
}>();

/**
 * События ----------------
 */
const emits = defineEmits(['update:modelValue']);

/**
 * Пользовательские переменные ----------------
 */
const isFocus = ref(false);
const textareaRef = ref(null);

/**
 * Вычисляемые значения ----------------
 */
// Значения поля ввода
const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits('update:modelValue', val);
  },
});

watch(model, () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = '50px';
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
    console.log(textareaRef.value.style.height);
  }
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.input {
  &:not(:last-child) {
    margin-bottom: 32px;
  }
  textarea {
    height: 50px;
    transition: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  label {
    top: 12px;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  &.focus {
    label {
      top: -10px;
    }
  }
}
</style>
