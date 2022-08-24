import useSWR from 'swr';
import {useLogoutOn401Response} from './useLogoutOn401Response';
import {laggy} from '../utils';

export const useProducts = (
  store_hash: string,
  queryParams: string[][] | Record<string, string> | string | URLSearchParams,
  useLaggy = false
) => {
  const params = new URLSearchParams(queryParams);
  const {data, error} = useSWR(
    `/bc-api/stores/${store_hash}/v3/catalog/products?${params.toString()}`,
    {
      revalidateOnFocus: false,
      ...(useLaggy) ? {use: [laggy]} : {}
    }
  );

  const isPending = (!error && !data);
  useLogoutOn401Response(error?.response?.status, store_hash);
  return [data?.data, data?.meta, error, isPending];
};
