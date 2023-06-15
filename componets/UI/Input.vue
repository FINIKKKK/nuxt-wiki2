<template>
  <div
      class="input"
      :class="{
      password: props.type === 'password',
      focus: isFocus
    }"
  >
    <div class="inner">
      <!-- Поле ввода -->
      <label>{{ props.label }}</label>
      <input
          :type="
          props.type === 'password' && !isShowPassword ? 'password' : 'text'
        "
          v-model="model"
          maxlength="200"
          @focus="isFocus = true"
          @blur="isFocus = false"
      />

      <!-- Кнопка для показа или скрытия пароля -->
      <div v-if="props.type === 'password'" class="showPassword">
        <svg-icon
            :name="isShowPassword ? 'noeye' : 'eye'"
            v-if="model"
            @click="isShowPassword = !isShowPassword"
        />
      </div>
    </div>
    <span class="error" v-for="error in props.errors"> {{ error }} </span>
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
  errors: string[];
  type?: string
}>();

/**
 * События ----------------
 */
const emits = defineEmits(['update:modelValue']);

/**
 * Системные переменные ----------------
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
const isShowPassword = ref(false); // Показывать пароль?
const isFocus = ref(false); // В фокусе input?

/**
 * Методы ----------------
 */
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.input {
  &:not(:last-child) {
    margin-bottom: 32px;
  }
  &.password {
    input {
      padding-right: 60px;
    }
  }
  .showPassword {
    position: absolute;
    bottom: 8px;
    right: 11px;
    cursor: pointer;
    opacity: 0.5;
    transition: 0.3s;
    svg {
      fill: $blue;
      width: 20px;
      height: 18px;
    }
    &:hover {
      opacity: 1;
    }
  }
}
</style>