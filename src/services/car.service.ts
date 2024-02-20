import { Types } from "mongoose";

import { obsceneWordsConstant } from "../constants/obscene-words.constant";
import {
  EAccountType,
  ECarStatus,
  EEmailAction,
  EShowroom,
  EUserRole,
} from "../enums";
import { ApiError } from "../errors";
import {
  carRepository,
  roleRepository,
  showroomRepository,
  userRepository,
} from "../repositories";
import { ICar } from "../types";
import { emailService } from "./email.service";

class CarService {
  public async createCar(
    body: Partial<ICar>,
    userId: Types.ObjectId,
    accountType: EAccountType,
  ) {
    const userCar = await carRepository.getOneByParams({ _userId: userId });

    if (userCar && accountType === EAccountType.BASIC) {
      throw new ApiError("you need to purchase a premium account", 403);
    }

    const arrayWords = body.description.split(" ");

    const matchWords = arrayWords.some((word) =>
      obsceneWordsConstant.includes(word),
    );
    if (matchWords) {
      const autoPortal = await showroomRepository.getOneByParams({
        showroom: EShowroom.AUTO_PORTAL,
      });

      const roleManagerId = await roleRepository.getOneByParams({
        role: EUserRole.MANAGER,
        _showroomId: autoPortal._id,
      });

      const manger = await userRepository.getOneByParams({
        _roleId: roleManagerId,
      });

      await emailService.sendMail(manger.email, EEmailAction.OBSCENE_WORDS, {
        number: userId.toString("hex"),
      });
    } else {
      body.carStatus = ECarStatus.ACTIVE;
    }
    return await carRepository.create({ ...body, _userId: userId });
  }
}

export const carService = new CarService();
