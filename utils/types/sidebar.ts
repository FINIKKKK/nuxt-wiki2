export interface TItem {
  icon: string;
  label: string;
  link?: string;
  method?: () => void;
  isShow?: boolean;
}

export interface TInnerItem {
  name: string;
  title: string;
  items?: TItem[];
}
