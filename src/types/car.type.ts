import { Types } from "mongoose";

import { ECarStatus, ECurrency, EOblastEnum } from "../enums";

export interface ICar {
  brand: string;
  model: string;
  year: string;
  description: string;
  price: string;
  currency: ECurrency;
  priceInUAH: number;
  priceInUSD: number;
  priceInEUR: number;
  oblast: EOblastEnum;
  _userId: Types.ObjectId;
  carStatus: ECarStatus;
}
