import { model, Schema } from "mongoose";

import { IRole } from "../types";

const roleSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Role = model<IRole>("role", roleSchema);
