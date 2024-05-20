import {
  BankAccountAuthPostModel,
  BankAccountAuthRequestBody,
  BankAccountAuthResponse,
} from "@/schema/bank/auth";
import { ApiClient } from "@/utils/client";
import qs from "qs";

const api = new ApiClient();

export class OpenPaymentAuth {
  /**
   * Token
   */
  private __token;

  public getToken = async () => {
    if (this.__token) return this.__token;
    try {
      await this.__auth({
        client_id: process.env.OPEN_PAYMENT_CLIENT_ID,
        client_secret: process.env.OPEN_PAYMENT_CLIENT_SECRET,
        grant_type: process.env.OPEN_PAYMENT_GRANT_TYPE,
        scope: process.env.OPEN_PAYMENT_SCOPE,
      });

      return this.__token;
    } catch (error) {
      throw error;
    }
  };
  /** Do request to auth.
   * Use
   * @param BankAccountAuthRequestBody
   * expect
   * @return @BankAccountAuthResponse object
   * in return
   */
  private __auth = async (request: BankAccountAuthRequestBody) => {
    try {
      const valid = BankAccountAuthPostModel.valid(request);
      if (valid) {
        const url = `${process.env.OPEN_PAYMENT_AUTH_HOST}/connect/token`;
        const bankAccountAuthResponse = (await api.post(
          url,
          qs.stringify(request),
          {
            headers: {
              "content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json",
            },
          }
        )) as unknown as { data: BankAccountAuthResponse };
        this.__token = bankAccountAuthResponse.data.access_token;
        return bankAccountAuthResponse.data;
      }
      throw new Error(`The model is not valid: ${valid}`);
    } catch (error) {
      throw error;
    }
  };
}
