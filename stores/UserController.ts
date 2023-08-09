import { defineStore } from 'pinia';
import { TUser, UserDataDto } from '~/utils/types/account';
import { TMyBilling } from '~/utils/types/billing';

/**
 * --------------------------------
 * Хранилище пользователя
 * --------------------------------
 */
export const useUserStore = defineStore('userController', () => {
  /**
   * Свойства ----------------
   */
  const user: Ref<TUser | null> = ref(null);
  const lang: Ref<'ru' | 'en'> = ref('ru');
  const billing = ref<TMyBilling | null>(null);

  /**
   * Методы ----------------
   */
  const setUser = (value: TUser | null) => {
    user.value = value;
  };
  const updateUserData = (value: UserDataDto) => {
    if (user.value) {
      user.value.first_name = value.first_name;
      user.value.last_name = value.last_name;
      user.value.email = value.email;
    }
  };
  const updateUserAvatar = (value: string) => {
    if (user.value) {
      user.value.picture = value;
    }
  };
  const changeLang = (value: 'ru' | 'en') => {
    lang.value = value;
  };
  const setBillingData = (value: TMyBilling | null) => {
    billing.value = value;
  };

  // Возвращаем данные
  return {
    user,
    setUser,
    updateUserData,
    updateUserAvatar,
    lang,
    changeLang,
    billing,
    setBillingData,
  };
});
