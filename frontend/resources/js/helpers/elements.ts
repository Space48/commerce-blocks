
export const rootElements = document.getElementsByClassName('s48-commerce-blocks');
export const currencySelector = document.querySelector('#currencySelection');

export const getCurrencyCode = (): string => {
  const option = currencySelector?.querySelector('strong')?.parentElement;
  if (option && option?.dataset &&  option?.dataset.currencyCode) {
    return option?.dataset.currencyCode;
  }
  // return admin configuration value
  return 'GBP';
};
