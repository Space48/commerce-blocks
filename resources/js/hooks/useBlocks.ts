import {useSWRFetch} from './useSWRFetch';
import {laggy} from '../utils';

export const useBlocks = (store_hash: string, queryParams: object = {}) => {
  const [data, error, isPending, mutate] = useSWRFetch(`/api/stores/${store_hash}/blocks`, queryParams, store_hash, {use: [laggy]});
  return [data, error, isPending, mutate];
};
