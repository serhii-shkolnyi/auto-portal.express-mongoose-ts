import { model, Schema } from "mongoose";

import { ICurrency } from "../types";

const currencySchema = new Schema(
  {
    USD: {
      type: Number,
      required: true,
    },
    EUR: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Currency = model<ICurrency>("currency", currencySchema);
