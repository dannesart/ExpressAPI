import {
  BankAccount,
  BankAccountId,
  BankCountry,
  BankInitConsentResponse,
  BankInitConsent,
} from "@/schema/bank/account";
import {
  BankAccountAuthRequestBody,
  BankAccountAuthResponse,
  BankAccountAuthPostModel,
} from "@/schema/bank/auth";
import { IBankService } from "@/schema/bank/service";
import {
  BankAccountMock,
  BankCountryMock,
  BankInitConsentResponseMock,
} from "./accounts";
import { bankAccountAuthResponseMock } from "./auth";

export class MockBankService implements IBankService {
  /** Do request to auth.
   * Use
   * @param BankAccountAuthRequestBody
   * expect
   * @return @BankAccountAuthResponse object
   * in return
   */
  public auth = (
    request: BankAccountAuthRequestBody
  ): Promise<BankAccountAuthResponse> | BankAccountAuthResponse => {
    try {
      const valid = BankAccountAuthPostModel.valid(request);
      if (valid) {
        return bankAccountAuthResponseMock as BankAccountAuthResponse;
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
  public getAccounts = (
    iso: string
  ): Promise<BankAccount[]> | BankAccount[] => {
    try {
      if (iso) {
        return [BankAccountMock] as BankAccount[];
      }
      throw new Error("No country code was provided.");
    } catch (error) {
      throw error;
    }
  };

  public getCountries = async (): Promise<BankCountry[]> => {
    return [BankCountryMock] as BankCountry[];
  };

  public initConsent = async (
    data: BankInitConsent
  ): Promise<BankInitConsentResponse> => {
    return BankInitConsentResponseMock as BankInitConsentResponse;
  };

  /**
   * Start auth consent
   */
  public startAuthConsent = async (
    consentId: string,
    bicFi: string,
    ipAddress: string
  ): Promise<any> => {
    return true;
  };

  /**
   * pick auth method
   */
  public pickAuthMethod = async (
    consentId: string,
    consentAuthId: string,
    authMethodId: string,
    bicFi: string,
    ipAddress: any
  ): Promise<any> => {
    return true;
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
    return true;
  };
}
