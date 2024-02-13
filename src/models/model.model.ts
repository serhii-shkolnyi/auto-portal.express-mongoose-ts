import { model, Schema, Types } from "mongoose";

import { IModel } from "../types";
import { Brand } from "./brand.model";

const modelSchema = new Schema(
  {
    model: {
      type: String,
      required: true,
    },
    _brandId: {
      type: Types.ObjectId,
      required: true,
      ref: Brand,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Model = model<IModel>("model", modelSchema);
