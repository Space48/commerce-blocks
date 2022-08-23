import {useSWRConfig} from 'swr';

export const useMatchMutate = () => {
  const {cache, mutate} = useSWRConfig();
  return (matcher, ...args) => {
    if (!(cache instanceof Map)) {
      throw new Error('matchMutate requires the cache provider to be a Map instance')
    }

    const keys = [];

    // @ts-ignore
    for (const key of cache.keys()) {
      if (matcher.test(key)) {
        // @ts-ignore
        keys.push(key)
      }
    }

    const mutations = keys.map((key) => mutate(key, ...args))
    return Promise.all(mutations)
  }
}
