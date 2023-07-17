<template>
  <div
    class="input"
    :class="{
      password: props.type === 'password',
      focus: isFocus || model,
      error: props.errors?.length,
      address: props.type === 'address',
    }"
    :data-layout="props.className"
  >
    <div class="inner">
      <!-- Поле ввода -->
      <label>
        {{ props.label }}
        <svg-icon v-if="props.type === 'address'" name="tooltip" />
      </label>
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
const vCustomMask = vMask();

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  label: string;
  modelValue: string;
  errors?: string[];
  type?: 'password' | 'address';
  className?: 'label';
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

//
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
  &:not(:last-child) {
    margin-bottom: 32px;
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
      display: flex;
      align-items: center;
    }
    input {
      margin-right: 8px;
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

.input[data-layout='label'] {
  label {
    background-color: $bg;
  }
}
</style>
