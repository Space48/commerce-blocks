import {useSWRFetch} from './useSWRFetch';

export const useStores = () => {
  return useSWRFetch(`/api/stores/`, {}, null, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });
};
