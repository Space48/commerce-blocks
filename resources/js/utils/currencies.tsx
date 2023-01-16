import {SelectOption, SelectOptionGroup} from '@bigcommerce/big-design/dist/components/Select/types';
import {Currency} from '../types';

export const currenciesAsSelectOptions = (currencies: Currency[]): SelectOption<any>[] | SelectOptionGroup<any>[] => {
  const selectCurrencies= [{
    content: 'Use currency selector',
    value: ''
  }]
  currencies?.map(({name, currency_code}) => {
    return  selectCurrencies.push({content: name, value: currency_code});
  });
  return selectCurrencies;
}
