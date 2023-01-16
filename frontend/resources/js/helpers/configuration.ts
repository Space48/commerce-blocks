import axios from 'axios';
import {getCurrencyCode} from './elements';

export const getConfiguration = async (element) => {
  const { apiUrl, storeHash, blockId } = element?.dataset;
  if (apiUrl && storeHash && blockId) {
    try {
      const config = await axios(`${apiUrl}/api/${storeHash}/block/${blockId}`);
      return { ...config?.data?.data, ...getLocalConfiguration() };
    }
    catch (e) {
      return;
    }
  }
};

export const getLocalConfiguration = () => ({
  currency_code: getCurrencyCode()
});
