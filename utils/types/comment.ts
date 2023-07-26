import { TBase } from '~/utils/types/index';
import { TUser } from '~/utils/types/account';

export interface TComment extends TBase {
  creator: TUser;
  entity_id: number;
  entity_type: string;
  tagged: null;
  text: string;
  user_id: number;
  likes: any[];
  block_id?: number;
}
