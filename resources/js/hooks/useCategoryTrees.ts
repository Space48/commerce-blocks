import useSWR from 'swr';
import {useLogoutOn401Response} from './useLogoutOn401Response';
import axios from 'axios';
import {KeyedMutator} from 'swr/dist/types';

export const useCategoryTrees = (
  store_hash: string,
  treeIds: [],
  queryParams: string[][] | Record<string, string> | string | URLSearchParams = [],
  fetchOptions: object = {}
): [any, any, boolean, KeyedMutator<any>] => {
  function fetcher(...urls) {
    const f = (u) => axios.get(u).then((r) => r.data);

    return Promise.all(urls.map(f));
  }

  const params = new URLSearchParams(queryParams);
  const urls = treeIds.map((id) => `/bc-api/stores/${store_hash}/v3/catalog/trees/${id}/categories` + (params.toString() ? `?${params.toString()}` : ''));

  const {data, error, mutate} = useSWR(
    treeIds?.length ? urls : null,
    fetcher,
    {...fetchOptions}
  );
  const isPending = !error && !data;

  useLogoutOn401Response(error?.response?.status, store_hash);

  return [data, error, isPending, mutate];
};

