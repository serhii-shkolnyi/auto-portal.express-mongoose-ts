import axios from "axios";
import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { apiConfig } from "../configs";
import { ApiError } from "../errors";
import { currencyRepository } from "../repositories";
import { ICurrency, IExchange } from "../types";

dayjs.extend(utc);

const currencyUpdate = async () => {
  try {
    const exchange: IExchange[] = await axios
      .get(apiConfig.API_PRIVAT_BANK_EXCHANGE)
      .then((value) => value.data);

    const exchangeRate: ICurrency = { USD: 0, EUR: 0 };

    exchange.forEach((currency) => {
      exchangeRate[currency.ccy] = parseFloat(currency.sale);
    });

    await currencyRepository.create(exchangeRate);
  } catch (e) {
    throw new ApiError(e.message, e.status);
  }
};

export const currencyUpdateCrone = new CronJob("42 20 * * *", currencyUpdate);
