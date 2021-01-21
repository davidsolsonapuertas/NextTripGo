import { CurrencyKey } from '../../config';

export async function getRate(currencies: string[]) {
  return await fetch(
    `https://free.currconv.com/api/v7/convert?q=${currencies[0]}_${currencies[1]}&compact=ultra&apiKey=${CurrencyKey}`
  ).then((response) => response.json());
}
