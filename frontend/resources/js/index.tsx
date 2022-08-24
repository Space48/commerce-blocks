import { h, render } from 'preact';
import { createClient, Provider } from '@urql/preact';
import axios from 'axios';
import App from './App';
import ConfigContext from './context/ConfigContext';

const rootElements = document.getElementsByClassName('s48-your-products-anywhere');

const getConfiguration = async (apiUrl, storeHash, blockId) => {
  try {
    const config = await axios(`${apiUrl}/api/${storeHash}/block/${blockId}`);
    return config?.data?.data;
  }
  catch (e) {
    console.log('Config error', e);
    return;
  }
};

/** @jsx h */
if (rootElements && rootElements.length > 0) {
  Array.from(rootElements).forEach(async element => {
    // @ts-ignore
    const config = await getConfiguration(element?.dataset?.apiUrl, element?.dataset?.storeHash, element?.dataset?.blockId);

    if (config !== undefined) {
      const client = createClient({
        url: `https://${config.store_url}/graphql`,
        fetchOptions: () => ({
          headers: { authorization: config.access_token ? `Bearer ${config.access_token}` : '' }
        })
      });

      render(
        <Provider value={client}>
          <ConfigContext.Provider value={config}>
            <App />
          </ConfigContext.Provider>
        </Provider>,
        element,
      );
    }
  });
}
