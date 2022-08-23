import {useSWRFetch} from './useSWRFetch';

export const useDesign = (store_hash: string, id: string) => {
  const [data, error, isPending, mutate] = useSWRFetch(`/api/stores/${store_hash}/designs/${id}`, {}, store_hash);
  return [data?.data, error, isPending, mutate];
};
