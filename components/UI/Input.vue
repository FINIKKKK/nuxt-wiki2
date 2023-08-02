<template>
  <div
    class="input"
    :class="{
      password: props.type === 'password',
      focus: isFocus || model,
      error: props.errors?.length,
      address: props.type === 'address',
      textarea: props.type_input === 'textarea' || props.type_input === 'div',
    }"
  >
    <div class="inner">
      <!-- Поле ввода -->
      <label>
        {{ props.label }}
        <svg-icon v-if="props.type === 'address'" name="tooltip" />
      </label>

      <div class="flex">
        <textarea
          v-if="type_input === 'textarea'"
          v-model="model"
          :maxlength="props.limit ? props.limit : 250"
          @focus="isFocus = true"
          @blur="isFocus = false"
          ref="textareaRef"
        />
        <div
          v-if="type_input === 'div'"
          class="div_input"
          contenteditable
          :maxlength="props.limit ? props.limit : 250"
          @focus="isFocus = true"
          @blur="isFocus = false"
          @input="emits('handleInput')"
        />
        <input
          v-else
          :type="
            props.type === 'password' && !isShowPassword ? 'password' : 'text'
          "
          v-model="model"
          :maxlength="props.limit ? props.limit : 200"
          @focus="isFocus = true"
          @blur="isFocus = false"
          v-custom-mask="mask"
          :readonly="props.isRead"
        />

        <div @click="emits('btnClick')" v-if="slots.btn" class="btn">
          <slot name="btn"></slot>
        </div>
        <div
          @click="emits('btnClick')"
          v-if="slots.btn2"
          class="btn-icon"
          :class="{ fill: props.btnType === 'fill' }"
        >
          <slot name="btn2"></slot>
        </div>
        <div
          @click="emits('btnClick2')"
          v-if="slots.btn3"
          class="btn-icon btn-icon2"
          :class="{ fill: props.btnType === 'fill' }"
        >
          <slot name="btn3"></slot>
        </div>
      </div>

      <!-- Кнопка для показа или скрытия пароля -->
      <div v-if="props.type === 'password'" class="showPassword">
        <svg-icon
          :name="isShowPassword ? 'noeye' : 'eye'"
          v-if="model"
          @click="isShowPassword = !isShowPassword"
        />
      </div>
      <!-- URL адресс -->
      <div v-if="type === 'address'" class="url">itl.wiki</div>
    </div>
    <span class="message" v-if="props.message">{{ props.message }}</span>
    <span class="error" v-if="errors">
      {{ $t[errors[0]] }}
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
  type?: 'password' | 'address' | 'phone';
  limit?: number;
  isRead?: boolean;
  message?: string;
  btnType?: 'fill';
  type_input: 'textarea' | 'div';
}>();

// Значение
const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits('update:modelValue', val);
  },
});

/**
 * События ----------------
 */
const emits = defineEmits([
  'update:modelValue',
  'btnClick',
  'btnClick2',
  'handleInput',
]);

/**
 * Переменные ----------------
 */
const vCustomMask = vMask();
const isShowPassword = ref(false);
const isFocus = ref(false);
const slots = useSlots();
const textareaRef = ref<HTMLTextAreaElement | null>(null);
const $t = await useTranslate('validation');

/**
 * Вычисляемые значения ----------------
 */
// Маска
const mask = computed(() => {
  if (props.type === 'phone') {
    return '+7 (999) 999-99-99';
  } else {
    return null;
  }
});

// Изменять высоту textarea
if (props.type_input === 'textarea') {
  watch(model, () => {
    if (textareaRef.value) {
      const textarea = textareaRef.value as HTMLTextAreaElement;
      textarea.style.height = '50px';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  });
}
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.input {
  position: relative;
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
    textarea,
    .div_input {
      width: 100%;
      padding: 16px 24px;
      border-radius: 2px;
    }
    input {
      transition: 0.3s;
    }
    textarea {
      height: 55px;
      &::-webkit-scrollbar {
        display: none;
      }
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
    .inner {
      border-color: $red2 !important;
    }
    label {
      color: $red2 !important;
    }
    .btn {
      background-color: $red;
    }
    .btn-icon {
      background-color: rgba($red, 0.15);
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

.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.btn-icon {
  width: 30px;
  height: 30px;
  background-color: rgba($blue, 0.1);
  padding: 8px;
  transition: 0.3s;
  cursor: pointer;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 15px 0 15px;
  &:hover {
    background-color: $blue2;
  }
}

.btn-icon2 {
  margin-left: -5px;
}

.message {
  position: absolute;
  bottom: 60px;
  right: 0;
  font-size: 12px;
  background-color: $white;
  padding: 5px 10px;
  box-shadow: 0 0 10px rgba($blue, 0.2);
  border-radius: 3px;
  max-width: 230px;
  z-index: 30;
}

.input.textarea {
  .flex {
    align-items: flex-start;
  }
  .btn-icon {
    margin-top: 12px;
  }
}
</style>

<style lang="scss">
.error {
  .btn-icon {
    i {
      color: $red;
    }
  }
}

.btn-icon {
  .disabled {
    opacity: 0.5;
  }
}

.btn-icon.fill {
  i {
    font-weight: 700;
  }
}
</style>
