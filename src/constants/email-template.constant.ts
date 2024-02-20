import { EEmailAction } from "../enums";

export const emailTemplateConstant = {
  [EEmailAction.ACTIVATE_ACCOUNT]: {
    templateName: "activate-account",
    subject: "Account activation is required!",
  },

  [EEmailAction.FORGOT_PASSWORD]: {
    templateName: "forgot-password",
    subject: "Restore password",
  },

  [EEmailAction.OBSCENE_WORDS]: {
    templateName: "obscene-words",
    subject: "Obscene Words",
  },
};
