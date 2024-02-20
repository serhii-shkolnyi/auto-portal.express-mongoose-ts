import { currencyUpdateCrone } from "./currency-update.cron";

export const cronRunner = () => {
  currencyUpdateCrone.start();
};
