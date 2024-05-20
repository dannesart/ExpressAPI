import { IPaymentService, IPaymentServiceResponse } from "@/schema/payment";
import { IUser } from "@/schema/user";
import { Utils } from "@/utils";
import { ActiveWalletMockResponse } from "./wallet";
import { BankAccountCreatedMockResponse } from "@/services/bank/mock/accounts";

export class MockPaymentService implements IPaymentService {
  ValidateUserModel(_user: IUser): { valid: boolean; message: string } {
    const userValidationResponse = {
      valid: true,
      message: null,
    };
    if (!Utils.VerifyPhoneNumber(_user.mobilePhone)) {
      userValidationResponse.valid = false;
      userValidationResponse.message = "Wrong format of mobile phone";
    }

    return userValidationResponse;
  }

  async CreateUser(_user: IUser): Promise<IPaymentServiceResponse> {
    if (!this.ValidateUserModel(_user).valid) {
      return Promise.reject({ status: "Invalid usermodel", statusCode: 500 });
    } else {
      return Promise.resolve({
        user: _user,
        statusCode: 200,
        status: "ok",
      });
    }

    // throw new Error("Method not implemented.");
  }

  async GetUser(_paymentUserId): Promise<any> {
    if (_paymentUserId) {
      return Promise.resolve({
        status: "success",
        message: "User successfuly fetched",
        user: {
          paymentUserId: _paymentUserId,
        },
      });
    }
    return Promise.reject({
      status: "error",
      message: "Couldnt get user",
    });
  }

  async GetUserCompliance(_paymentUserId): Promise<any> {
    if (_paymentUserId) {
      return true;
    }

    return false;
  }

  async GetUsers(): Promise<any> {
    return [];
  }

  async DeleteUser(_paymentUserId: string): Promise<any> {
    return true;
  }

  async RequestVerifyUser(_user: IUser): Promise<boolean> {
    if (_user.id) {
      return Promise.resolve(true);
    }
    return Promise.reject(false);
  }
  async ValidateVerifyUser(
    paymentUserId: string,
    otp: string
  ): Promise<boolean> {
    if (paymentUserId) {
      return Promise.resolve(true);
    }
    return Promise.reject(false);
  }
  SendPayment(): boolean {
    throw new Error("Method not implemented.");
  }

  async SetKYCInformation(paymentUserId: string, information): Promise<any> {
    if (!paymentUserId || !information) {
      throw new Error("Missing required information");
    }
    return Promise.resolve("KYC information added");
  }

  async TemporarySetKYC(paymentUserId: string): Promise<any> {
    if (!paymentUserId) {
      throw new Error("Missing paymentUserId");
    }

    return Promise.resolve("Temporary KYC resolved");
  }

  async TemporalPK(): Promise<string> {
    return Promise.resolve("temporalPK key");
  }

  async ConnectBankAccount(walletId: string, data: any): Promise<any> {
    return Promise.resolve(BankAccountCreatedMockResponse);
  }

  async InitPayment(): Promise<any> {
    return Promise.resolve({});
  }

  async CardCashIns(walletId: string, data: any): Promise<any> {
    if (!walletId) {
      return Promise.reject("Missing walletid");
    }
    if (!data) {
      return Promise.reject("Missing request data");
    }

    return Promise.resolve({});
  }

  async CashOut(walletId: string, data: any): Promise<any> {
    if (!walletId) {
      return Promise.reject(new Error("Missing walletid"));
    }
    if (!data) {
      return Promise.reject(new Error("Missing request data"));
    }

    return Promise.resolve({});
  }

  async GetWallet(walletId: string): Promise<any> {
    if (!walletId) {
      return Promise.reject(new Error("Missing walletid"));
    }

    return Promise.resolve(ActiveWalletMockResponse);
  }

  async GetWalletFromPaymentUserId(paymentUserId): Promise<any> {
    if (!paymentUserId) {
      return Promise.reject(new Error("Missing paymentUserId"));
    }
    return Promise.resolve(ActiveWalletMockResponse);
  }

  async GetWalletTransactionHistory(walletId: string): Promise<any> {
    if (!walletId) {
      return Promise.reject(new Error("Missing walletid"));
    }

    return Promise.resolve({
      status: 200,
    });
  }

  async CreateIban(walletId: string): Promise<any> {
    if (!walletId) {
      return Promise.reject(new Error("Missing walletid"));
    }

    return Promise.resolve({
      status: 200,
    });
  }

  async Transfer(
    amount: number,
    message?: string,
    fromWalletId?: string,
    toWalletId?: string,
    fromIban?: string,
    toIban?: string
  ) {
    if (!fromWalletId || !toWalletId || !amount) {
      return Promise.reject(
        new Error("Missing any of fromWalletId, toWalletId or amount")
      );
    }

    return Promise.resolve({});
  }
}
