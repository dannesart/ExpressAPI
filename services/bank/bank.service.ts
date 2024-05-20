import { IBankService } from "@/schema/bank/service";
import { OpenPaymentBankService } from "./openpayment/service";
import { TinkPaymentBankService } from "./tink/service";
import { MockBankService } from "./mock";

export class BankService {
  service: IBankService;

  constructor(_useMock: boolean | string) {
    const useMock = typeof _useMock === "string" ? !!_useMock : _useMock;

    if (useMock) {
      this.service = new MockBankService();
    } else {
      if (process.env.BANK_PROVIDER === "openpayment") {
        this.service = new OpenPaymentBankService();
      } else if (process.env.BANK_PROVIDER === "tink") {
        this.service = new TinkPaymentBankService();
      }
    }
  }

  GetBankService(): IBankService {
    return this.service;
  }
}

export { IBankService };
