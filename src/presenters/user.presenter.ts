import { IUser } from "../types";

export class UserPresenter {
  public static userResponse(user: IUser) {
    return {
      _id: user._id,
      userName: user.userName,
      phone: user.phone,
      email: user.email,
      _roleId: user._roleId,
      accountType: user.accountType,
      accountStatus: user.accountStatus,
      // avatar: user?.avatar ? `${apiConfig.AWS_S3_URL}${user?.avatar}` : null,
    };
  }
}
