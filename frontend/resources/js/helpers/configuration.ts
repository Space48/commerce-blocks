import axios from 'axios';
import { currencySelector } from './elements';

const getCurrencySelectorCurrencyCode = () => {
  const option = currencySelector?.querySelector('strong')?.parentElement;
  if (option && option?.dataset &&  option?.dataset.currencyCode) {
    return option?.dataset.currencyCode;
  }
};

const getCurrencyCode = (defaultCurrencyCode): string => getCurrencySelectorCurrencyCode() ?? defaultCurrencyCode ?? 'GBP';

export const getConfiguration = async (element) => {
  const { apiUrl, storeHash, blockId } = element?.dataset;
  if (apiUrl && storeHash && blockId) {
    try {
      const config = await axios(`${apiUrl}/api/${storeHash}/block/${blockId}`);
      return combinedConfigs(config?.data?.data);
    }
    catch (e) {
      return;
    }
  }
};

export const combinedConfigs = (externalConfig) => ({
  ...externalConfig,
  currency_code: getCurrencyCode(externalConfig?.currency_code)
});
