<template>
  <!-- Поле ввода -->
  <UIInput
    :label="props.label"
    v-model="itemsValue"
    :errors="errorsInput"
    @keydown.enter="() => onAddItem(itemsValue)"
    @input="onSplitItem"
    @btnClick="() => onAddItem(itemsValue)"
  >
    <template #btn v-if="slots.btn">
      <slot name="btn"></slot>
    </template>
  </UIInput>

  <!-- Список emails -->
  <ul class="items" v-if="model.length">
    <li class="item" v-for="(item, index) in model" :key="index">
      <p>{{ item }}</p>
      <i class="fa-regular fa-close" @click="() => onRemoveItem(item)" />
    </li>
  </ul>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useFormValidation } from '~/hooks/useFormValidation';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  label: string;
  scheme: any;
  modelValue: string[];
  errors?: string[];
}>();

/**
 * События ----------------
 */
const emits = defineEmits(['update:modelValue']);

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
 * Переменные ----------------
 */
const slots = useSlots();
const itemsValue = ref('');
const { errors, validateForm } = useFormValidation();

/**
 * Вычисляемое ----------------
 */
// Ошибки поля
const clearErrors = ref(false);
const errorsInput = computed(() => {
  return clearErrors.value ? [] : errors.value['items'] || props.errors;
});

/**
 * Методы ----------------
 */
// Добавить элемент в список
const onAddItem = async (item: string) => {
  clearErrors.value = false;

  // Валидируем данные
  const isValid = await validateForm({ items: itemsValue.value }, props.scheme);
  if (!isValid) return false;

  if (!model.value.find((obj) => obj === item)) {
    // Добавить элемент
    model.value.push(item.trim());
  }
  itemsValue.value = '';
  clearErrors.value = true;
};

// Добавить элемент в список через запятую
const onSplitItem = (e: any) => {
  if (e.target.value.includes(',')) {
    onAddItem(itemsValue.value.split(',')[0]);
  }
};

// Удалить элемент из списка
const onRemoveItem = (item: string) => {
  model.value = model.value.filter((obj) => obj !== item);
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.items {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 12px;
  .item {
    &:not(:last-child) {
      margin-right: 20px;
    }
    background-color: $blue2;
    display: flex;
    align-items: center;
    border-radius: 2px;
    padding: 10px 15px;
    margin-bottom: 20px;
    p {
      color: $blue;
      margin-right: 10px;
    }
    i {
      width: 17px;
      height: 17px;
      cursor: pointer;
    }
  }
}
</style>
