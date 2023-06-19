import { AxiosInstance } from 'axios';
import { TBase, TMessage } from '~/api/types';
import { TTeam } from '~/api/models/team';

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
export type TUser = TBase & {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  date_format: string;
  fullname: string;
  locale: string;
  logged_in: string;
  online: boolean;
  picture: string;
};
export type TAuthData = {
  token: string;
  user: TUser;
};
export type TUserData = {
  user: TUser;
  teams: TTeam[];
};
export type UserDataDto = {
  first_name: string;
  last_name: string;
  email: string;
};
export type UserPasswordDto = {
  password: string;
  new_password: string;
};

/**
 * Модель (Аккаунт/Пользователь) ----------------
 */
export const AccountApi = (instance: AxiosInstance) => ({
  // Создаем нового пользователя
  async register(dto: RegisterDto) {
    const { data } = await instance.post<RegisterDto, { data: TAuthData }>(
      '/account/register/secure',
      dto,
    );
    return data;
  },

  // Вход в аккаунт
  async login(dto: LoginDto) {
    const { data } = await instance.post<LoginDto, { data: TAuthData }>(
      '/account/auth',
      dto,
    );
    return data;
  },

  // Получение информация о пользователе
  async me() {
    const { data } = await instance.get<{ data: TUserData }>('/account');
    return data;
  },

  // Изменение данных пользователя
  async edit(dto: UserDataDto) {
    const { data } = await instance.post<UserDataDto, any>(
      '/account/common/edit',
      dto,
    );
    return data;
  },

  // Изменение пароля пользователя
  async password(dto: UserPasswordDto) {
    const { data } = await instance.post<UserPasswordDto, any>(
      '/account/password/change',
      dto,
    );
    return data;
  },

  // Изменение аватарки пользователя
  async avatar(image: any) {
    const formData = new FormData();
    formData.append('image', image);

    const { data } = await instance.post(`/account/picture/change`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  // Выход из аккаунта
  async logout() {
    const { data } = await instance.post<TMessage>('/account/logout');
    return data;
  },
});
