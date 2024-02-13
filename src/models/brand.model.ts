import { model, Schema } from "mongoose";

import { IBrand } from "../types";

const brandSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Brand = model<IBrand>("brand", brandSchema);
