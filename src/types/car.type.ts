import { Types } from "mongoose";

import { ECarStatus, ECurrency, EOblastEnum } from "../enums";

export interface ICar {
  _id?: Types.ObjectId;
  brand: string;
  model: string;
  year: string;
  description: string;
  price: number;
  currency: ECurrency;
  priceInUAH: number;
  priceInUSD: number;
  priceInEUR: number;
  oblast: EOblastEnum;
  _currencyIdCreateCar: Types.ObjectId;
  _currencyIdUpdateCar?: Types.ObjectId;
  _userId: Types.ObjectId;
  carStatus: ECarStatus;
}
