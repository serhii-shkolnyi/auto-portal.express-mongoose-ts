import { model, Schema, Types } from "mongoose";

import { IRole } from "../types";
import { Showroom } from "./showroom.model";

const roleSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
    },
    _showroomId: {
      type: Types.ObjectId,
      required: true,
      ref: Showroom,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Role = model<IRole>("role", roleSchema);
