import { TBase } from '~/utils/types/index';
import { TGroup } from '~/utils/types/group';
import { TRole } from '~/utils/types/role';

export interface TRequisite {
  name: string;
  BIK: string;
  BIN: string;
  account: string;
  address: string;
}

export interface TRequisites extends TBase {
  requisites: TRequisite;
  groups: TGroup[];
  roles: TRole[];
}

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
  plan: TPlan;
}

export interface TInvoice extends TBase {
  amount: number;
  status: string;
  payment_type: string;
  type: string
}
