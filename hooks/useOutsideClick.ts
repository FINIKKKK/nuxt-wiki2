/**
 * Хук для закрытия попапа, если клик был вне его области
 */
export const useOutsideClick = (
    elementRef: Ref<HTMLElement | null>,
    event: Ref<boolean | null>,
    callback?: any,
) => {
    const handleClickOutside = (e: MouseEvent) => {
        if (elementRef.value && !elementRef.value.contains(e.target as Node)) {
            // Закрытие попапа
            event.value = false;
            // Дополнительный действия
            if (callback) {
                callback();
            }
        }
    };

    onMounted(() => {
        document.addEventListener('click', handleClickOutside);
    });
    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside);
    });
}