import {
  BankAuthConsentResponse,
  BankAuthConsentStatusResponse,
  BankCountry,
  BankInitConsent,
  BankInitConsentResponse,
} from "@/schema/bank/account";
import { BankAccount, BankAccountId } from "@/schema/bank/account";
import {
  BankAccountAuthPostModel,
  BankAccountAuthRequestBody,
  BankAccountAuthResponse,
} from "@/schema/bank/auth";
import { IBankService } from "@/schema/bank/service";
import { Utils } from "@/utils";
import { ApiClient } from "@/utils/client";
import { NextFunction, Response, Request } from "express";
import qs from "qs";

const api = new ApiClient();

export class TinkPaymentBankService implements IBankService {
  /**
   * Init tink connect. This will redirect request to tink link. And then it will be redirected to api with auth data.
   * That data will be handled in handleConnectResponse.
   */
  public initConnect = async (
    req: Request,
    res: Response,
    next: NextFunction,
    redirectUri: string = process.env.TINK_CLIENT_REDIRECT_URI,
    locale: string = process.env.TINK_LOCALE,
    market: string = process.env.TINK_MARKET
  ) => {
    const fullTinkLink = `${process.env.TINK_LINK}?client_id=${process.env.TINK_CLIENT_ID}&redirect_uri=${redirectUri}&market=${market}&locale=${locale}`;
    return res.send({ connectLink: fullTinkLink });
  };

  /**
   * this will be fired once tink link sends user back to api.
   */
  public handleConnectResponse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    next();
  };

  /**
   * Token
   */
  private token;
  public getToken = async () => {
    // if (this.token) return this.token;

    try {
      await this.auth({
        client_id: process.env.OPEN_PAYMENT_CLIENT_ID,
        client_secret: process.env.OPEN_PAYMENT_CLIENT_SECRET,
        grant_type: process.env.OPEN_PAYMENT_GRANT_TYPE,
        scope: process.env.OPEN_PAYMENT_SCOPE,
      });

      return this.token;
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
  public auth = async (
    request: BankAccountAuthRequestBody
  ): Promise<BankAccountAuthResponse> => {
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
        this.token = bankAccountAuthResponse.data.access_token;
        return bankAccountAuthResponse.data;
      }
      throw new Error(`The model is not valid: ${valid}`);
    } catch (error) {
      throw error;
    }
  };

  /** Do request to auth validate.
   * expect
   * @return @boolen
   * in return
   */
  public authValidate = (): Promise<boolean> | boolean => {
    return true;
  };

  /** Do request to auth.
   * Use
   * @param BankAccountAuthRequestBody
   * expect
   * @return @BankAccountAuthResponse object
   * in return
   */
  public getAccounts = async (isoCountry: string): Promise<BankAccount[]> => {
    try {
      const headers = {
        authorization: `Bearer ` + (await this.getToken()),
        accept: "application/json",
        "X-Request-ID": Utils._uuid(),
      };

      const url = `${process.env.OPEN_PAYMENT_API_HOST}/psd2/aspspinformation/v1/aspsps?isoCountryCodes=${isoCountry}`;
      const bankAccountsResponse = (await api.get(
        url,
        {},
        headers
      )) as unknown as { data: { aspsps: BankAccount[] } };

      return bankAccountsResponse.data.aspsps as BankAccount[];
    } catch (error) {
      throw error;
    }
  };
  /** Do request to get countries.
   * Use
   * @param BankAccountAuthRequestBody
   * expect
   * @return @BankAccountAuthResponse object
   * in return
   */
  public getCountries = async (): Promise<BankCountry[]> => {
    try {
      const headers = {
        authorization: `Bearer ` + (await this.getToken()),
        accept: "application/json",
        "X-Request-ID": Utils._uuid(),
      };

      const url = `${process.env.OPEN_PAYMENT_API_HOST}/psd2/aspspinformation/v1/countries`;
      const bankCountriesResponse = (await api.get(
        url,
        {},
        headers
      )) as unknown as { data: { aspsps: BankCountry[] } };

      return bankCountriesResponse.data.aspsps as BankCountry[];
    } catch (error) {
      throw error;
    }
  };

  /**
   * Request for initiation for consent.
   */
  public initConsent = async (
    data: BankInitConsent,
    bicFi: string,
    userAgent: string,
    ipAddress: string
  ): Promise<BankInitConsentResponse> => {
    try {
      const headers = {
        authorization: `Bearer ` + (await this.getToken()),
        accept: "application/json",
        "Content-type": "application/json",
        "X-Request-ID": Utils._uuid(),
        "X-BicFi": bicFi,
        "PSU-User-Agent": userAgent,
        "PSU-IP-Address": ipAddress,
        "TPP-Redirect-Preferred": false,
      };
      const url = `${process.env.OPEN_PAYMENT_API_HOST}/psd2/consent/v1/consents`;
      const bankInitConsentResponse = (await api.post(url, data, {
        headers,
      })) as unknown as { data: BankInitConsentResponse };

      return bankInitConsentResponse.data as BankInitConsentResponse;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Start auth consent
   */
  public startAuthConsent = async (
    consentId: string,
    bicFi: string,
    ipAddress: string
  ): Promise<any> => {
    try {
      const headers = {
        authorization: `Bearer ` + (await this.getToken()),
        accept: "application/json",
        "X-Request-ID": Utils._uuid(),
        "X-BicFi": bicFi,
        "PSU-IP-Address": ipAddress,
        "TPP-Redirect-Preferred": false,
      };
      const url = `${process.env.OPEN_PAYMENT_API_HOST}/psd2/consent/v1/consents/${consentId}/authorisations`;
      const bankInitConsentResponse = (await api.post(
        url,
        {},
        { headers }
      )) as unknown as BankInitConsentResponse;

      return bankInitConsentResponse as BankInitConsentResponse;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Pick auth method
   */
  public pickAuthMethod = async (
    consentId: string,
    consentAuthId: string,
    authMethodId: string,
    bicFi: string,
    ipAddress: any
  ) => {
    try {
      const headers = {
        authorization: `Bearer ` + (await this.getToken()),
        accept: "application/json",
        "Content-Type": "application/json",
        "X-Request-ID": Utils._uuid(),
        "X-BicFi": bicFi,
        "PSU-IP-Address": ipAddress,
        "TPP-Redirect-Preferred": false,
      };
      const url = `${process.env.OPEN_PAYMENT_API_HOST}/psd2/consent/v1/consents/${consentId}/authorisations/${consentAuthId}`;
      const bankInitConsentResponse = (await api.put(
        url,
        {
          authenticationMethodId: authMethodId,
        },
        { headers }
      )) as unknown as { data: BankAuthConsentResponse };

      return bankInitConsentResponse.data as BankAuthConsentResponse;
    } catch (error) {
      throw error;
    }
  };

  /**
   * get auth status
   */
  public getAuthStatus = async (
    consentId: string,
    consentAuthId: string,
    bicFi: string,
    ipAddress: any
  ): Promise<any> => {
    try {
      const headers = {
        authorization: `Bearer ` + (await this.getToken()),
        accept: "application/json",
        "Content-Type": "application/json",
        "X-Request-ID": Utils._uuid(),
        "X-BicFi": bicFi,
        "PSU-IP-Address": ipAddress,
        "TPP-Redirect-Preferred": false,
      };
      const url = `${process.env.OPEN_PAYMENT_API_HOST}/psd2/consent/v1/consents/${consentId}/authorisations/${consentAuthId}`;
      const bankAuthStatusConsentResponse = (await api.get(
        url,
        {},
        headers
      )) as unknown as { data: BankAuthConsentStatusResponse };

      return bankAuthStatusConsentResponse.data as BankAuthConsentStatusResponse;
    } catch (error) {
      throw error;
    }
  };
}
