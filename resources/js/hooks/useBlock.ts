import {useSWRFetch} from './useSWRFetch';

export const useBlock = (store_hash: string, id: string) => {
  const [data, error, isPending, mutate] = useSWRFetch(`/api/stores/${store_hash}/blocks/${id}`, {}, store_hash);
  return [data?.data, error, isPending, mutate];
};
