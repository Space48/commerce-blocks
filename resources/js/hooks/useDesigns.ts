import {useSWRFetch} from './useSWRFetch';

export const useDesigns = (store_hash: string, queryParams: object = {}) => {
  const [data, error, isPending, mutate] = useSWRFetch(`/api/stores/${store_hash}/designs`, queryParams, store_hash);
  return [data?.data, error, isPending, mutate];
};
