import { ConcreteComponent } from '@vue/runtime-core';

export interface TSelect {
  value: number | string;
  label: string;
}

export interface TComponentItem {
  [key: string]: ConcreteComponent | string;
}

export interface TNav {
  label: string;
  link: string;
}
