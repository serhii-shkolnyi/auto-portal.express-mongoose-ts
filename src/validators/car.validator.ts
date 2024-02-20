import joi from "joi";

import { ECurrency, EOblastEnum } from "../enums";

export class CarValidator {
  private static brand = joi.string().min(2).max(30).trim();
  private static model = joi.string().min(2).max(30).trim();
  private static year = joi.number().min(1950).max(2024);
  private static price = joi.number().min(1).max(10000000);
  private static currency = joi.valid(...Object.values(ECurrency));
  private static oblast = joi.valid(...Object.values(EOblastEnum));
  private static description = joi.string().min(15).max(500).trim();

  public static create = joi.object({
    brand: this.brand.required(),
    model: this.model.required(),
    year: this.year.required(),
    price: this.price.required(),
    currency: this.currency.required(),
    oblast: this.oblast.required(),
    description: this.description.required(),
  });
}
