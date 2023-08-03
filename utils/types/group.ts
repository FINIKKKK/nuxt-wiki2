import { TBase } from '~/utils/types/index';
import { TUser } from '~/utils/types/account';

export interface TGroup extends TBase {
  name: string;
  users: TUser[];
}
