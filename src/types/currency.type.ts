import { ECurrency } from "../enums";

export interface ICurrency {
  USD: number;
  EUR: number;
  [key: string]: number;
}

export interface IExchange {
  ccy: ECurrency;
  base_ccy: ECurrency;
  buy: string;
  sale: string;
}
