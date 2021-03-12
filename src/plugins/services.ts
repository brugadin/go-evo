/* eslint-disable */
import { provider } from '@/core/services';
import { AppStore } from '@/store/game/models';

export const prepareServices = (store: AppStore): void => {
  store.$services = provider();
};
