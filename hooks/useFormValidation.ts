/**
 * Типы ----------------
 */
interface FormErrors {
  [key: string]: string[];
}

/**
 * Хук для валидации формы и выполнения дополнительной логики
 */
export const useFormValidation = () => {
  const errorsValidate: Ref<FormErrors> = ref({}); // Ошибки валидации

  // Функция валидации
  const validateForm = async (dto?: any, schema?: any) => {
    try {
      errorsValidate.value = {}; // Обнуляем ошибки
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
          if (!errorsValidate.value) errorsValidate.value = {};
          if (!errorsValidate.value[path]) {
            errorsValidate.value[path] = [];
          }
          errorsValidate.value[path].push(error.message);
        });
      }
      return false;
    }
  };

  // Возвращаем данные
  return {
    errorsValidate,
    validateForm,
  };
};
