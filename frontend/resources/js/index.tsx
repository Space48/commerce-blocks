import { h, render } from 'preact';
import App from './App';
import { createClient, Provider } from '@urql/preact';

const getToken = () => {
  const root = document.getElementsByClassName('s48-your-products-anywhere');
  // @ts-ignore
  return root.length > 0 ? root[0]?.dataset?.token : '';
};

const getConfig = () => ({
  type: 'CAROUSEL', // or carousel
  columns: 2,
  perPage: 9,
  btnColor: '#000',
  btnTextColor: '#FFF',
  fontFamily: 'sans-serif',
  textColor: '#000',
  enableSearch: false,
  enableFilters: false
});

const client = createClient({
  url: 'https://space-48-apps-2022.mybigcommerce.com/graphql',
  fetchOptions: () => {
    const token = getToken();
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' }
    };
  }
});


const root = document.getElementsByClassName('s48-your-products-anywhere');

/** @jsx h */
if (root) {
  render(
    <Provider value={client}>
      <App config={getConfig()} />
    </Provider>,
    root[0],
  );
}
