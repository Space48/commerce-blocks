import { Config } from '../types';

const useConfig = () => {
  const config: Config = {
    type: 'CAROUSEL', // or carousel
    columns: 3,
    perPage: 9,
    btnColor: 'royalblue',
    btnHoverColor: 'powderblue',
    btnTextColor: '#FFF',
    btnTextHoverColor: '#000',
    iconColor: 'royalblue',
    fontFamily: 'sans-serif',
    textColor: '#000',
    enableSearch: true,
    enableFilters: true,
    source: 'email_campaign',
    gaId: 'my-ga-id'
  };
  return [config];
};

export default useConfig;