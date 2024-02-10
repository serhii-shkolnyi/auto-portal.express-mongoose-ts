import { Document, Types } from "mongoose";

import { EAccountStatus, EAccountType } from "../enums";

export interface IUser extends Document {
  _id: Types.ObjectId;
  userName: string;
  phone: string;
  email: string;
  password: string;
  _roleId: Types.ObjectId;
  accountType: EAccountType;
  accountStatus: EAccountStatus;
  avatar: string | null;
}
