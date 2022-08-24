import {useSWRFetch} from './useSWRFetch';

export const useTrees = (store_hash, queryParams, fetchOptions) => {
  return useSWRFetch(
    `/bc-api/stores/${store_hash}/v3/catalog/trees`,
    queryParams,
    store_hash,
    fetchOptions
  )
    ;
};
