import { currencyUpdateCrone } from "./currency-update.cron";
import { updatePriceCarCrone } from "./updatePriceCar.cron";

export const cronRunner = () => {
  currencyUpdateCrone.start();
  updatePriceCarCrone.start();
};
