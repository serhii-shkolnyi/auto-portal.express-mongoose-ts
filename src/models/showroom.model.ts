import { model, Schema } from "mongoose";

import { IShowroom } from "../types";

const showroomSchema = new Schema(
  {
    showroom: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Showroom = model<IShowroom>("showroom", showroomSchema);
