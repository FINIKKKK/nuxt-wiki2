type FormErrors = {
  [key: string]: string[];
};

/**
 * Хук для валидации формы и выполнения дополнительной логики
 */
export const useFormValidation = () => {
  const errorsValidate: Ref<FormErrors> = ref({}); // Ошибки валидации
  const errors = ref([]); // Ошибки колбека
  const isLoading = ref(false); // Загрузка

  const validateForm = async (dto?: any, schema?: any, callback?: any) => {
    try {
      errorsValidate.value = {}; // Обнуляем ошибки
      errors.value = []; // Обнуляем ошибки
      isLoading.value = true; // Ставим загрузку
      // Валидируем данные
      if (schema) {
        await schema.validate(dto, { abortEarly: false });
      }
      // Выполняем дополнительную логику
      if (callback) {
        await callback();
      }
    } catch (err: any) {
      // Обрабатываем ошибки валидации
      if (err.inner) {
        // Приводим значение к одному виду
        err.inner.forEach((error: any) => {
          const path = error.path;
          if (!errorsValidate.value[path]) {
            errorsValidate.value[path] = [];
          }
          errorsValidate.value[path].push(error.message);
        });
      }
      // Обрабатываем ошибки колбека
      errors.value = err.response.data.message;
      console.log('err', err.response.data.message);
      console.log(err);
    } finally {
      isLoading.value = false; // Убираем загрузку
    }
  };

  return {
    errorsValidate,
    errors,
    isLoading,
    validateForm,
  };
};
