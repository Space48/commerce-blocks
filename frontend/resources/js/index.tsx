import { h, render } from 'preact';
import App from './App';
import { createClient, Provider } from '@urql/preact';

const getToken = () => {
  const root = document.getElementsByClassName('s48-your-products-anywhere');
  // @ts-ignore
  return root.length > 0 ? root[0]?.dataset?.token : '';
};

const client = createClient({
  url: 'https://space-48-apps-2022.mybigcommerce.com/graphql',
  fetchOptions: () => {
    const token = getToken();
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' }
    };
  }
});


const rootElements = document.getElementsByClassName('s48-your-products-anywhere');

/** @jsx h */
if (rootElements && rootElements.length > 0) {
  Array.from(rootElements).forEach(element => {
    render(
      <Provider value={client}>
        <App />
      </Provider>,
      element,
    );
  });
}
