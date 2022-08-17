import { h, render } from 'preact';
import App from './App';
import { createClient, Provider } from '@urql/preact';

const getToken = () => {
  console.log('Get Token');
  return '';
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


const root = document.getElementById('root');

/** @jsx h */
if (root) {
  render(
    <Provider value={client}>
      <App />
    </Provider>,
    document.body,
  );
}
