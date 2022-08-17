import { h, render } from 'preact';
import App from './App';
import { createClient, Provider } from '@urql/preact';

const getToken = () => {
  // https://toms.space48apps.com/
  // return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjaWQiOjEsImNvcnMiOlsiaHR0cHM6Ly90b21zLnNwYWNlNDhhcHBzLmNvbSJdLCJlYXQiOjE2NjIzODk1NzIsImlhdCI6MTY2MDY2MTU3MiwiaXNzIjoiQkMiLCJzaWQiOjEwMDIyODk1OTAsInN1YiI6ImNuODNyZm81Zm4wZnFneHQyeDUwazhwZnhzbng2MmEiLCJzdWJfdHlwZSI6MiwidG9rZW5fdHlwZSI6MX0.pzqMhwUIDKo36x-gXXKMMVZ-UAzUQuyRz4b4dTw0uWG1IHVRzHUCuO362Myrob32bKh2NMIir0odNPYFv4N6rA';
  // https://space-48-apps-2022.mybigcommerce.com/
  return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjaWQiOjEsImNvcnMiOlsiaHR0cHM6Ly9zcGFjZS00OC1hcHBzLTIwMjIubXliaWdjb21tZXJjZS5jb20iXSwiZWF0IjoxNjYyNDYzMzEyLCJpYXQiOjE2NjA3MzUzMTMsImlzcyI6IkJDIiwic2lkIjoxMDAyMjg5NTkwLCJzdWIiOiJjbjgzcmZvNWZuMGZxZ3h0Mng1MGs4cGZ4c254NjJhIiwic3ViX3R5cGUiOjIsInRva2VuX3R5cGUiOjF9.stml9UJVHsINZEw_CNapWUw77rd9k5o-7_LhTyCmNRrEbY_7-ZR0in1rUqJDFx3jFDapYbfZq7hj70k3v0Oj-Q';
};

const getConfig = () => ({
  type: 'grid', // or carousel
  columns: 3,
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
