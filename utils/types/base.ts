import {ConcreteComponent} from "@vue/runtime-core";

export interface TSelect {
  value: number;
  label: string;
}

export interface TComponentItem {
  [key: string]: ConcreteComponent | string;
}