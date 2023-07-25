import 'intersection-observer';

export default defineNuxtPlugin((nuxtApp) => {
  let isScrolled = false; // Флаг, чтобы отслеживать, был ли скролл на 30 пикселей

  // Функция для добавления/удаления класса в зависимости от значения isScrolled
  function updateScrollClass(el) {
    if (isScrolled) {
      el.classList.add('scrolled-class');
    } else {
      el.classList.remove('scrolled-class');
    }
  }

  nuxtApp.vueApp.directive('observe-header', {
    mounted(el, binding) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            binding.value(entry.target);
          }
        });
      }, options);

      observer.observe(el);

      // Добавляем обработчик события скролла для обновления флага isScrolled
      window.addEventListener('scroll', () => {
        isScrolled = window.scrollY >= 30;
        updateScrollClass(el);
      });
    },

    unmounted() {
      // Удаляем обработчик события при демонтировании директивы, чтобы избежать утечек памяти
      window.removeEventListener('scroll', () => {
        isScrolled = window.scrollY >= 30;
        updateScrollClass(el);
      });
    },

    getSSRProps(binding, vnode) {
      return {};
    },
  });
});
