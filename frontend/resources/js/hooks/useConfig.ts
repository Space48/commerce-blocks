
const useConfig = () => {
  const config = {
    type: 'CAROUSEL', // or carousel
    columns: 2,
    perPage: 9,
    btnColor: 'royalblue',
    btnTextColor: '#FFF',
    iconColor: 'royalblue',
    fontFamily: 'sans-serif',
    textColor: '#000',
    enableSearch: false,
    enableFilters: false
  };
  return [config];
};

export default useConfig;