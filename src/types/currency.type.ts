import { Types } from "mongoose";

import { ECurrency } from "../enums";

export interface ICurrency {
  _id?: Types.ObjectId;
  USD: number;
  EUR: number;
  [key: string]: number | Types.ObjectId;
}

export interface IExchange {
  ccy: ECurrency;
  base_ccy: ECurrency;
  buy: string;
  sale: string;
}
