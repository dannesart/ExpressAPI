import { Utils } from "@/utils";
import { BankAccountAuthResponse } from "@/schema/bank/auth";

export const bankAccountAuthResponseMock: BankAccountAuthResponse = {
  access_token: Utils._uuid(),
  expires_in: new Date().getTime(),
  token_type: "bearer",
  scope: "openid",
};
