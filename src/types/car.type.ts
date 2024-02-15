import { Types } from "mongoose";

import { ECarStatus, ECurrency, EOblastEnum } from "../enums";

export interface ICar {
  brand: string;
  model: string;
  year: string;
  price: string;
  currency: ECurrency;
  oblast: EOblastEnum;
  _userId: Types.ObjectId;
  carStatus: ECarStatus;
}
