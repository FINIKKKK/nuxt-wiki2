<template>
  <div
    class="input"
    :class="{
      password: props.type === 'password',
      focus: isFocus || model,
      error: props.errors.length,
      address: props.type === 'address',
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
      <!-- Url адресс -->
      <div v-if="type === 'address'" class="url">itl.wiki</div>
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
  type?: string;
}>();

/**
 * События ----------------
 */
const emits = defineEmits(['update:modelValue']);

/**
 * Системные переменные ----------------
 */
const isShowPassword = ref(false); // Показывать пароль?
const isFocus = ref(false); // В фокусе input?

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
  .showPassword {
    position: absolute;
    bottom: 10px;
    right: 15px;
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
  &.password {
    input {
      padding-right: 45px;
    }
  }
  &.address {
    .inner {
      display: flex;
      align-items: center;
    }
    input {
      margin-right: 8px;
    }
  }
  .error {
    display: block;
  }
}
</style>
