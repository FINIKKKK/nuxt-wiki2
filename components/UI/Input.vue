<template>
  <div
    class="input"
    :class="{
      password: props.type === 'password',
      focus: isFocus || model,
      error: props.errors?.length,
      address: props.type === 'address',
    }"
  >
    <div class="inner">
      <!-- Поле ввода -->
      <label>
        {{ props.label }}
        <svg-icon v-if="props.type === 'address'" name="tooltip" />
      </label>

      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <input
          :type="
            props.type === 'password' && !isShowPassword ? 'password' : 'text'
          "
          v-model="model"
          maxlength="200"
          @focus="isFocus = true"
          @blur="isFocus = false"
          v-custom-mask="mask"
        />

        <button
          @click="emits('btnClick')"
          v-if="slots.btn"
          class="btn"
        >
          <slot name="btn"></slot>
        </button>
      </div>

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
    <span class="error" v-if="errors">
      {{ errors[0] }}
    </span>
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
  errors?: string[];
  type?: 'password' | 'address';
}>();

/**
 * События ----------------
 */
const emits = defineEmits(['update:modelValue', 'btnClick']);

/**
 * Переменные ----------------
 */
const vCustomMask = vMask();
const isShowPassword = ref(false);
const isFocus = ref(false);
const slots = useSlots();

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
// Маска
const mask = computed(() => {
  if (props.type === 'phone') {
    return '+7 (999) 999-99-99';
  } else {
    return null;
  }
});
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.input {
  .inner {
    border: 1px solid $blue2;
    position: relative;
    &:hover {
      border-color: $blue;
    }
    label {
      display: inline-block;
      pointer-events: none;
      color: $blue2;
      font-size: 16px;
      position: absolute;
      left: 15px;
      top: 15px;
      background-color: $white;
      padding: 0 5px;
      transition: 0.3s;
    }
    input,
    textarea {
      width: 100%;
      padding: 16px 24px;
      transition: 0.3s;
      border-radius: 2px;
    }
  }
  &.focus {
    border-color: $blue;
    label {
      top: -10px;
      font-size: 14px;
      color: $blue;
    }
  }
  &.error {
    border-color: $red2 !important;
    label {
      color: $red2 !important;
    }
    input,
    textarea {
    }
  }
  .error {
    font-size: 12px;
    color: $red;
  }
}

.input {
  &:not(:last-child) {
    margin-bottom: 24px;
  }
  label {
    display: flex;
    align-items: center;
    svg {
      margin-left: 5px;
      width: 15px;
      height: 15px;
      fill: $blue2;
    }
  }
  input {
    font-size: 16px;
    line-height: 20px;
    transition: 0s;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
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
      position: relative;
      display: flex;
      align-items: center;
    }
  }
  .url {
    position: absolute;
    top: 7px;
    right: 15px;
    padding: 8px 24px;
    border-radius: 2px;
    background-color: $blue2;
  }
  .error {
    display: block;
  }
  &.focus {
    label svg {
      fill: $blue;
    }
  }
}

.btn {
  cursor: pointer;
  font-size: 14px;
  padding: 8px 24px;
  background-color: $blue;
  color: $white;
  margin-left: 15px;
  margin-right: 10px;
}
</style>
