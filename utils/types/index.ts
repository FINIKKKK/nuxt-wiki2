export interface TBase {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface TMessage {
  status: string;
  code: number;
  messages: string[];
}
