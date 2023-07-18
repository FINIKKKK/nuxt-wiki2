import { useUserStore } from '~/stores/UserController';

export default defineNuxtPlugin(() => {
  const userController = useUserStore();
  const lang = useCookie('lang');

  lang.value && userController.changeLang(lang.value);
});
