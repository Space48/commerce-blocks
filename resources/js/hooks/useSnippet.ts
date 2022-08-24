import {useSWRFetch} from './useSWRFetch';

export const useSnippet = (store_hash: string, id: string) => {
  const [data, error, isPending, mutate] = useSWRFetch(`/api/stores/${store_hash}/blocks/${id}/snippet`, {}, store_hash);
  return [data?.data?.snippet, error, isPending, mutate];
};
