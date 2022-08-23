import {useSWRFetch} from './useSWRFetch';

export const useChannels = (store_hash: string, queryParams: object = {}) => {
  const defaultParams = {
    available: true,
    'type:in': 'storefront'
  };

  const [data, error, isPending, mutate] = useSWRFetch(
    `/bc-api/stores/${store_hash}/v3/channels`,
    {...defaultParams, ...queryParams},
    store_hash,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  return [data, error, isPending, mutate];
};
