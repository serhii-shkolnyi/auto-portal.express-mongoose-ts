import { model, Schema, Types } from "mongoose";

import { EAccountStatus, EAccountType } from "../enums";
import { IUser } from "../types";
import { Role } from "./role.model";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    _roleId: {
      type: Types.ObjectId,
      required: true,
      ref: Role,
    },
    accountType: {
      type: String,
      enum: EAccountType,
      default: EAccountType.BASIC,
    },
    accountStatus: {
      type: String,
      enum: EAccountStatus,
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

export const User = model<IUser>("user", userSchema);
