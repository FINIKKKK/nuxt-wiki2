import { TBase } from '~/utils/types/index';
import { TUser } from '~/utils/types/account';
import { TArticle } from '~/utils/types/article';

export interface TNotice extends TBase {
  entity: TArticle;
  from: null;
  from_id: number | null;
  from_type: string | null;
  name: string;
  notify_id: number;
  notify_type: string;
  params: { message: string };
  read_at: string | null;
  team_id: number;
  to: TUser;
  to_id: number;
  to_type: string | null;
}

export interface TNotifications {
  notifications: TNotice[];
  unread: number;
}
