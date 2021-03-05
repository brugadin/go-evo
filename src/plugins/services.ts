/* eslint-disable */
import { provider } from '@/core/services';
import { Store } from 'vuex';

export const prepareServices = (store: Store<any>): void => {
  store.$services = provider();
};
