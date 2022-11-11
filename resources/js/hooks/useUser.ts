import axios from 'axios';
import useSWR from 'swr';
import {useLogoutOn401Response} from './useLogoutOn401Response';

export const useUser = () => {
  const fetcher = url => axios.get(url).then(res => res.data)
  const {data, error} = useSWR(`/api/users/me`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });
  const isPending = !error && !data;

  useLogoutOn401Response(error?.response?.status);

  return [data?.data, error, isPending];
};
