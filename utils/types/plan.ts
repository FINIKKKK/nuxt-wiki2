import { TBase } from '~/utils/types/index';

export interface TFeature {
  id: number;
  code: string;
  feature_data: {
    value: number;
  };
}

export interface TPlan extends TBase {
  name: string;
  active: boolean;
  price: number;
  features: TFeature[];
}

export interface TMyBilling {
  balance: number;
  plan: TPlan
};