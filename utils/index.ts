import { v4 as uuidv4 } from "uuid";
import { createHash } from "crypto";

export const Utils = {
  VerifyEmail(email: string): boolean {
    if (!email) return false;
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  },
  VerifyPhoneNumber(phonenumber: string): boolean {
    if (!phonenumber) return false;

    const re = /^\+([0-9]{1,3})\)?[-. ]?([0-9]{2,4})[-. ]?([0-9]{4,8})$/;
    const tested = re.test(phonenumber.toLowerCase());
    return tested;
  },

  _uuid: () => {
    return uuidv4() || "";
  },

  iban: () => {
    return "";
  },

  ascii: (string: string) => {
    return string
      .split("")
      .map((char) => char.charCodeAt(0))
      .join(" ");
  },

  sha256: (string) => {
    return createHash("sha256").update(string).digest("hex");
  },
};

import toSwagger, {
  version as swaggerVersion,
  fullVersion as swaggerFullVersion,
  toSwaggerOperation,
} from "./swagger";
export { toSwagger, swaggerVersion, swaggerFullVersion, toSwaggerOperation };
