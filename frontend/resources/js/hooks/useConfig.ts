
const useConfig = () => {
  const config = {
    type: 'CAROUSEL', // or carousel
    columns: 2,
    perPage: 9,
    btnColor: 'royalblue',
    btnHoverColor: 'powderblue',
    btnTextColor: '#FFF',
    btnTextHoverColor: '#000',
    iconColor: 'royalblue',
    fontFamily: 'sans-serif',
    textColor: '#000',
    enableSearch: true,
    enableFilters: true
  };
  return [config];
};

export default useConfig;