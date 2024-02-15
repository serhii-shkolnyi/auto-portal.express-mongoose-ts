import { model, Schema, Types } from "mongoose";

import { EAccountStatus, ECarStatus, ECurrency, EOblastEnum } from "../enums";
import { ICar } from "../types";
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
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      enum: ECurrency,
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
