import { h, render } from 'preact';
import { createClient, Provider } from '@urql/preact';
import axios from 'axios';
import App from './App';
import ConfigContext from './context/ConfigContext';
import { isPageBuilder } from './helpers';
import PageBuilder from './PageBuilder';

const rootElements = document.getElementsByClassName('s48-commerce-blocks');

const getConfiguration = async (element) => {
  const { apiUrl, storeHash, blockId } = element?.dataset;
  if (apiUrl && storeHash && blockId) {
    try {
      const config = await axios(`${apiUrl}/api/${storeHash}/block/${blockId}`);
      return config?.data?.data;
    }
    catch (e) {
      return;
    }
  }
};

const renderPageBuilder = async (element) => {
  // on widget reload/refresh, when the page builder reloads the widget html
  const onChange = async (mutations) => {
    for (const mutation of mutations) {
      const div = mutation.target.querySelector('.s48-commerce-blocks');
      if (div) {
        const config = await getConfiguration(div);
        render(
          <PageBuilder blockName={config?.block_name} />,
          div,
        );
        break;
      }
    }
  };
  const observer = new MutationObserver(onChange);
  observer.observe(document.body, { subtree: true, childList: true, characterData: true });

  // on initial load of blank widget
  const config = await getConfiguration(element);
  return render(
    <PageBuilder blockName={config?.block_name} />,
    element,
  );
};


/** @jsx h */
if (rootElements && rootElements.length > 0) {
  Array.from(rootElements).forEach(async element => {
    if (isPageBuilder()) {
      return renderPageBuilder(element);
    }

    const config = await getConfiguration(element);
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
