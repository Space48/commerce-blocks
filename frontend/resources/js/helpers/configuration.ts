import axios from 'axios';
import { bodyElement } from './elements';

const getCurrencySelectorCurrencyCode = () => {
  if (bodyElement && bodyElement?.dataset && bodyElement?.dataset?.currencyCode) {
    return bodyElement?.dataset.currencyCode;
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
