import { h, render } from 'preact';
import App from './App';
import { createClient, Provider } from '@urql/preact';

const getToken = () => {
  return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjaWQiOjEsImNvcnMiOlsiaHR0cHM6Ly90b21zLnNwYWNlNDhhcHBzLmNvbSJdLCJlYXQiOjE2NjIzODk1NzIsImlhdCI6MTY2MDY2MTU3MiwiaXNzIjoiQkMiLCJzaWQiOjEwMDIyODk1OTAsInN1YiI6ImNuODNyZm81Zm4wZnFneHQyeDUwazhwZnhzbng2MmEiLCJzdWJfdHlwZSI6MiwidG9rZW5fdHlwZSI6MX0.pzqMhwUIDKo36x-gXXKMMVZ-UAzUQuyRz4b4dTw0uWG1IHVRzHUCuO362Myrob32bKh2NMIir0odNPYFv4N6rA';
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
    root,
  );
}
