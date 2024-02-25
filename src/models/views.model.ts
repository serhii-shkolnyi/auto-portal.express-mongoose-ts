import { model, Schema, Types } from "mongoose";

import { IView } from "../types";
import { Car } from "./car.model";

const viewSchema = new Schema(
  {
    view: {
      type: Number,
      required: true,
    },
    _carId: {
      type: Types.ObjectId,
      required: true,
      ref: Car,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const View = model<IView>("view", viewSchema);
