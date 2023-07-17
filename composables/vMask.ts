export const vMask = () => ({
  mounted(el: any, mask: Ref<string>) {
    const { $Inputmask } = useNuxtApp();

    const inputmask = new $Inputmask({
      mask: mask.value,
      showMaskOnHover: false,
    });

    inputmask.mask(el);
  },
});
