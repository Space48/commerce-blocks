import useSWR from 'swr';
import {useLogoutOn401Response} from './useLogoutOn401Response';

export const useSWRFetch = (endpoint, queryParams = {}, store_hash: string | null = null, fetchOptions = {}, fetcher = null) => {
  const params = new URLSearchParams(queryParams);
  const {data, error, mutate} = useSWR(
    endpoint ? `${endpoint}` + (params.toString() ? `?${params.toString()}` : '') : null,
    fetcher,
    {...fetchOptions}
  );
  const isPending = !error && !data;

  useLogoutOn401Response(error?.response?.status, store_hash);

  return [data, error, isPending, mutate];
};
