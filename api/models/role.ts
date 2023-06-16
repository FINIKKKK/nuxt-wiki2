import { AxiosInstance } from 'axios';

/**
 * Типы ----------------
 */
export type TRole = {
  id: number;
  description?: string;
  name: string;
  permissions: any[];
};

/**
 * Модель (Роль) ----------------
 */
export const RoleApi = (instance: AxiosInstance) => ({});
