/**
 * Типы ----------------
 */
export interface FormErrors {
  [key: string]: string[];
}

/**
 * Хук для валидации формы и выполнения дополнительной логики
 */
export const useFormValidation = () => {
  const errors: Ref<FormErrors> = ref({}); // Ошибки валидации

  // Функция валидации
  const validateForm = async (dto?: any, schema?: any) => {
    try {
      errors.value = {}; // Обнуляем ошибки
      // Валидируем данные
      if (schema) {
        await schema.validate(dto, { abortEarly: false });
      }
      return true;
    } catch (err: any) {
      // Обрабатываем ошибки валидации
      if (err.inner) {
        // Приводим значение к одному виду
        err.inner.forEach((error: any) => {
          const path = error.path;
          if (!errors.value) errors.value = {};
          if (!errors.value[path]) {
            errors.value[path] = [];
          }
          errors.value[path].push(error.message);
        });
      }
      return false;
    }
  };

  // Возвращаем данные
  return {
    errors,
    validateForm,
  };
};
