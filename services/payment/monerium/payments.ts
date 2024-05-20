import { MoneriumAuth } from "./auth";
import { IPaymentService } from "@/schema/payment";
import Transaction, { ITransaction } from "@/schema/wallet/transaction";

export class MoneriumPayments implements IPaymentService {
  private auth: MoneriumAuth = new MoneriumAuth();

  public GetWalletTransactionHistory = async (
    walletId: string,
    options?: { amount: number; sort: string }
  ) => {
    // Get history.
    try {
      const transactions: ITransaction[] = await Transaction.find().or([
        { from: walletId },
        { to: walletId },
      ]);
      return transactions || [];
    } catch (error) {
      return [];
    }
  };

  public InitPayment = async (
    amount: number,
    message?: string,
    fromWalletId?: string,
    toWalletId?: string,
    fromIban?: string,
    toIban?: string
  ) => {
    // if (amount && message && fromIban && fromWalletId && toIban && toWalletId) {
    // const token = await this.auth.getToken();
    // if (token) {
    //   return true;
    // }
    const token = await this.auth.getToken();
    //}
    if (token) return true;

    return false;
  };

  public Transfer = (
    amount: number,
    message?: string,
    fromWalletId?: string,
    toWalletId?: string,
    fromIban?: string,
    toIban?: string
  ) => {
    if (amount && message && fromIban && fromWalletId && toIban && toWalletId)
      return true;

    return false;
  };
}
