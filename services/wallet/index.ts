import { DfnsWalletService } from "./dfns/wallet.service";
import { PeyyaWalletService } from "./peyya/wallet.service";
import { IWalletService } from "@/schema/wallet/service";

export class WalletService {
  service: IWalletService;

  constructor(_useMock: boolean | string) {
    const useMock = typeof _useMock === "string" ? !!_useMock : _useMock;
    if (useMock) {
      this.service = new PeyyaWalletService();
    } else {
      // TODO: implement this
      this.service = new DfnsWalletService();
    }
  }

  GetWalletService(): IWalletService {
    return this.service;
  }
}
