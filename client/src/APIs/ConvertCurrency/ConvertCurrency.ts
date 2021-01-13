import { CurrencyKey } from '../../config';

export async function getRate(currencies: string[]) {
  //TODO fix 'h'
  return await fetch(
    `ttps://free.currconv.com/api/v7/convert?q=${currencies[0]}_${currencies[1]}&compact=ultra&apiKey=${CurrencyKey}`
  ).then((response) => response.json());
}
