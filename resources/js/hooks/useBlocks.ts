import {useSWRFetch} from './useSWRFetch';

export const useBlocks = (store_hash: string, queryParams: object = {}) => {
  const [data, error, isPending, mutate] = useSWRFetch(`/api/stores/${store_hash}/blocks`, queryParams, store_hash);
  return [data, error, isPending, mutate];
};
