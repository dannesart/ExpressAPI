import {
  BankAuthConsentResponse,
  BankAuthConsentStatusResponse,
  BankCountry,
  BankInitConsent,
  BankInitConsentResponse,
} from "@/schema/bank/account";
import { BankAccount } from "@/schema/bank/account";
import { IBankService } from "@/schema/bank/service";
import { Utils } from "@/utils";
import { ApiClient } from "@/utils/client";
import { OpenPaymentAuth } from "./auth";

const api = new ApiClient();

export class OpenPaymentBankService
  extends OpenPaymentAuth
  implements IBankService
{
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
      )) as unknown as { data: { countries: BankCountry[] } };

      return bankCountriesResponse.data.countries as BankCountry[];
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
