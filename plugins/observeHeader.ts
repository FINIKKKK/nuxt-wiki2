import 'intersection-observer';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('observe-header', {
    mounted(el, binding) {
      const onChangeHeader = () => {
        if (el.scrollTop > 30) {
          el.classList.add('scrolled');
        } else {
          el.classList.remove('scrolled');
        }

        if (typeof binding.value === 'function') {
          // Передаем аргументы в пользовательскую функцию
          binding.value(el.scrollTop > 30);
        }
      };

      el.addEventListener('scroll', onChangeHeader);

      // Удаление обработчика события при уничтожении элемента
      el._cleanupScrollEvent = () => {
        el.removeEventListener('scroll', onChangeHeader);
      };

      // Вызываем функцию вручную, чтобы проверить состояние при монтировании элемента
      onChangeHeader();
    },

    beforeUnmount(el) {
      el._cleanupScrollEvent();
    },

    getSSRProps(binding, vnode) {
      return {};
    },
  });
});
