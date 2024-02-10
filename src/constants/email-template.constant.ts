import { EEmailAction } from "../enums";

export const emailTemplateConstant = {
  [EEmailAction.ACTIVATE_ACCOUNT]: {
    templateName: "activate-account",
    subject: "Account activation is required!",
  },
};
