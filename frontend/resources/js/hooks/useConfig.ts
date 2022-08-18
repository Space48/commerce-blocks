
const useConfig = () => {
  const config = {
    type: 'GRID', // or carousel
    columns: 3,
    perPage: 9,
    btnColor: 'royalblue',
    btnTextColor: '#FFF',
    iconColor: 'royalblue',
    fontFamily: 'sans-serif',
    textColor: '#000',
    enableSearch: true,
    enableFilters: true
  };
  return [config];
};

export default useConfig;