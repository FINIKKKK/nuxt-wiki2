export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('hover', {
    mounted(el, binding) {
      el.addEventListener('mouseenter', () => {
        const blockInner = el.closest('.block').querySelector('.block_content');
        if (blockInner) {
          blockInner.classList.add('hover');
        }
      });

      el.addEventListener('mouseleave', () => {
        const blockInner = el.closest('.block').querySelector('.block_content');
        if (blockInner) {
          blockInner.classList.remove('hover');
        }
      });
    },
  });
});
