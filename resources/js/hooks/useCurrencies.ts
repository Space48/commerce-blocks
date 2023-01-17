import {useSWRFetch} from './useSWRFetch';

export const useCurrencies = (
  store_hash: string,
  queryParams = {},
  fetchOptions = {},
) => {

  const defaultFetchOptions = {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  }

  const [response, error, isLoading, mutate] = useSWRFetch(
    `/bc-api/stores/${store_hash}/v2/currencies`,
    queryParams,
    store_hash,
    {...defaultFetchOptions, ...fetchOptions},
  );

  return [response, error, isLoading, mutate];
};
