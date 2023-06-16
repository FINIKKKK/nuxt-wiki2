/**
 * Хук для обработки ошибок
 */
export const useHandleErrors = () => {
  const isLoading = ref(false); // Загрузка

  // Обработчик
  const handleSubmit = async (callback: any) => {
    try {
      isLoading.value = true; // Ставим загрузку
      // Выполняем логику
      await callback();
    } catch (err) {
      console.warn(err);
    } finally {
      isLoading.value = false; // Убираем загрузку
    }
  };

  return { isLoading, handleSubmit };
};
