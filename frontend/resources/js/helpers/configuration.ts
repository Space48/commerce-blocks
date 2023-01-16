import axios from 'axios';
import { currencySelector } from './elements';

const getCurrencySelectorCurrencyCode = () => {
  // the only way I can see to get the active currency selector is by finding the bold item in the dropdown,
  // then using the data attribute to get the code
  const option = currencySelector?.querySelector('strong')?.parentElement;
  if (option && option?.dataset && option?.dataset?.currencyCode) {
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
