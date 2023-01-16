import { CurrencyInfo } from '../types';

export const getPriceText = (price : number, currencyInfo: CurrencyInfo): string =>
  `${getSymbolLeft(currencyInfo)}${formatPrice(price, currencyInfo)}${getSymbolRight(currencyInfo)}`;

const getSymbolLeft = (currencyInfo) => `${currencyInfo.display.symbolPlacement === 'LEFT' ? currencyInfo.display.symbol : ''}`;
const getSymbolRight = (currencyInfo) => `${currencyInfo.display.symbolPlacement === 'RIGHT' ? currencyInfo.display.symbol : ''}`;

const formatPrice = (number, currencyInfo) => {
  const decPlaces = currencyInfo.display.decimalPlaces ?? 2;
  const thouSep = currencyInfo.display.thousandsToken ?? ',';
  const decSep = currencyInfo.display.decimalToken ?? '.';

  const sign = number < 0 ? '-' : '';
  // eslint-disable-next-line radix
  const i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
  // @ts-ignore
  var j = (j = i.length) > 3 ? j % 3 : 0;

  return sign +
    (j ? i.substr(0, j) + thouSep : '') +
    i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, '$1' + thouSep) +
    // @ts-ignore
    (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : '');
};
