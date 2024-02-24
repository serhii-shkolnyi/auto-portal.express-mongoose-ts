import { model, Schema, Types } from "mongoose";

import { EAccountStatus, ECarStatus, ECurrency, EOblastEnum } from "../enums";
import { ICar } from "../types";
import { Currency } from "./currency.model";
import { User } from "./user.model";

const carSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ECurrency,
      required: true,
    },
    priceInUAH: {
      type: String,
      required: true,
    },
    priceInUSD: {
      type: String,
      required: true,
    },
    priceInEUR: {
      type: String,
      required: true,
    },
    oblast: {
      type: String,
      enum: EOblastEnum,
      required: true,
    },
    _userId: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
    carStatus: {
      type: String,
      enum: ECarStatus,
      default: EAccountStatus.INACTIVE,
    },
    _currencyIdCreateCar: {
      type: Types.ObjectId,
      required: true,
      ref: Currency,
    },
    _currencyIdUpdateCar: {
      type: Types.ObjectId,
      default: null,
      ref: Currency,
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Car = model<ICar>("car", carSchema);
