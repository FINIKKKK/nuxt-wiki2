export type TBase = {
  id: number;
  created_at: string;
  updated_at: string;
};

export type TMessage = {
  status: string;
  code: number;
  messages: string[];
};
