import { model, Schema } from "mongoose";

import { IOblast } from "../types";

const oblastSchema = new Schema(
  {
    oblast: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Oblast = model<IOblast>("oblast", oblastSchema);
