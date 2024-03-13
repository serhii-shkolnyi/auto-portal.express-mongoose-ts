import { Types } from "mongoose";

import { obsceneWordsConstant } from "../constants/obscene-words.constant";
import {
  EAccountType,
  ECarStatus,
  ECurrency,
  EEmailAction,
  EShowroom,
  EUserRole,
} from "../enums";
import { ApiError } from "../errors";
import {
  carRepository,
  currencyRepository,
  roleRepository,
  showroomRepository,
  userRepository,
} from "../repositories";
import { viewRepository } from "../repositories/view.repository";
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
      const course = await currencyRepository.getLastRecord();
      switch (body.currency) {
        case ECurrency.UAH: {
          body.priceInUAH = body.price;
          body.priceInUSD = Math.round(body.price / course.USD);
          body.priceInEUR = Math.round(body.price / course.EUR);
          body._currencyIdCreateCar = course._id;
          break;
        }
        case ECurrency.USD: {
          body.priceInUSD = body.price;
          body.priceInUAH = Math.round(body.price * course.USD);
          body.priceInEUR = Math.round(body.priceInUAH / course.EUR);
          body._currencyIdCreateCar = course._id;
          break;
        }
        case ECurrency.EUR: {
          body.priceInEUR = body.price;
          body.priceInUAH = Math.round(body.price * course.EUR);
          body.priceInEUR = Math.round(body.priceInUAH / course.USD);
          body._currencyIdCreateCar = course._id;
          break;
        }
      }
    }
    const car = await carRepository.create({ ...body, _userId: userId });
    await viewRepository.create(car._id);

    return car;
  }

  public async getAll() {
    return await carRepository.getAll();
  }
}

export const carService = new CarService();
