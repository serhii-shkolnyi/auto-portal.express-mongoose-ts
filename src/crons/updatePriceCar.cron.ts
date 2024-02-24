import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { ECurrency } from "../enums";
import { ApiError } from "../errors";
import { carRepository, currencyRepository } from "../repositories";

dayjs.extend(utc);

const updatePriceCar = async () => {
  try {
    const allCars = await carRepository.getAll();
    const lastCourse = await currencyRepository.getLastRecord();

    for (const car of allCars) {
      switch (car.currency) {
        case ECurrency.UAH: {
          car.priceInUAH = car.price;
          car.priceInUSD = Math.round(car.price / lastCourse.USD);
          car.priceInEUR = Math.round(car.price / lastCourse.EUR);

          await carRepository.updateForId(car._id, {
            priceInUAH: car.priceInUAH,
            priceInUSD: car.priceInUSD,
            priceInEUR: car.priceInEUR,
            _currencyIdUpdateCar: lastCourse._id,
          });
          break;
        }
        case ECurrency.USD: {
          car.priceInUSD = car.price;
          car.priceInUAH = Math.round(car.price * lastCourse.USD);
          car.priceInEUR = Math.round(car.priceInUAH / lastCourse.EUR);

          await carRepository.updateForId(car._id, {
            priceInUAH: car.priceInUAH,
            priceInUSD: car.priceInUSD,
            priceInEUR: car.priceInEUR,
            _currencyIdUpdateCar: lastCourse._id,
          });
          break;
        }
        case ECurrency.EUR: {
          car.priceInEUR = car.price;
          car.priceInUAH = Math.round(car.price * lastCourse.EUR);
          car.priceInUSD = Math.round(car.priceInUAH / lastCourse.USD);

          await carRepository.updateForId(car._id, {
            priceInUAH: car.priceInUAH,
            priceInUSD: car.priceInUSD,
            priceInEUR: car.priceInEUR,
            _currencyIdUpdateCar: lastCourse._id,
          });
          break;
        }
      }
    }
  } catch (e) {
    throw new ApiError(e.message, e.status);
  }
};

export const updatePriceCarCrone = new CronJob("43 20 * * *", updatePriceCar);
