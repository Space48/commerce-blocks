// @ts-nocheck
import {useContext, useEffect} from 'react';
import ConfigContext from '../context/ConfigContext';
import {useParams} from 'react-router-dom';
import {useStore} from './useStore';
import {useUser} from './useUser';
import {HookParams} from '../types';

export const useHelpScoutBeacon = () => {
  const context = useContext(ConfigContext);
  const {store_hash} = useParams<HookParams>();
  const [store] = useStore(store_hash);
  const [user] = useUser();

  const domain = 'https://beacon-v2.helpscout.net'

  const loadScript = () => {
    if (window.Beacon) return false;
    (function (e, t, n) {
      function a() {
        const e = t.getElementsByTagName('script')[0],
          n = t.createElement('script')
        ;(n.async = !0), (n.src = domain), e.parentNode?.insertBefore(n, e)
      }

      if (
        ((e.Beacon = n = function (t, n, a) {
          e.Beacon.readyQueue.push({method: t, options: n, data: a})
        }),
          (n.readyQueue = []),
        'complete' === t.readyState)
      )
        return a()
      e.attachEvent
        ? e.attachEvent('onload', a)
        : e.addEventListener('load', a, !1)
    })(window, document, window.Beacon || function () {
    })
    return true;
  }

  useEffect(() => {
    // add the current user to helpscout
    if (store && user) {
      window.Beacon('identify', {
        name: user.name ?? '',
        email: user.email ?? '',
        company: store.name ?? '',
      })
    }
  }, [store, user]);

  const startChat = () => {
    window.Beacon('config', {mode: 'askFirst'})
    window.Beacon('open');
  };

  const loaded = loadScript();
  if (loaded) {
    window.Beacon('init', context.helpscoutBeaconId);
  }

  return [startChat];
}
