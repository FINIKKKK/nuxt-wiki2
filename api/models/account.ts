import { AxiosInstance } from 'axios';
import { TMessage } from '~/api/types';

/**
 * Типы ----------------
 */
export type LoginDto = {
  email: string;
  password: string;
};
export type RegisterDto = LoginDto & {
  first_name: string;
  last_name: string;
  phone: string;
};
export type TUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
};

/**
 * Модель, связанная с аккаунтом пользователя ----------------
 */
export const AccountApi = (instance: AxiosInstance) => ({
  // Создаем нового пользователя
  async register(dto: RegisterDto) {
    const { data } = await instance.post<RegisterDto, { data: string }>(
      '/account/register/secure',
      dto,
    );
    return data;
  },

  // Вход в аккаунт
  async login(dto: LoginDto) {
    const { data } = await instance.post<LoginDto, { data: TUser }>(
      '/account/auth',
      dto,
    );
    return data;
  },

  // Выход из аккаунта
  async logout() {
    const { data } = await instance.post<TMessage>('/account/logout');
    return data;
  },
});
