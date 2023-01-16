import {SelectOption, SelectOptionGroup} from '@bigcommerce/big-design/dist/components/Select/types';
import {Currency} from '../types';

export const currenciesAsSelectOptions = (currencies: Currency[]): SelectOption<any>[] | SelectOptionGroup<any>[] => {
  return currencies?.map(({name, currency_code}) => {
    return {content: name, value: currency_code};
  });
}
