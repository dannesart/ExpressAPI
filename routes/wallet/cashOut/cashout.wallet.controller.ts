/**
 * Controller
 */
import { TransactionController } from "@/controllers/transaction.controller";

/**
 * Services
 */
import { PaymentService } from "@/services/payment/payment.service";
const paymentService = new PaymentService(
  process.env.APP_USE_MOCK
).GetPaymentService();

/**
 * Schemas
 */
import { IUser } from "@/schema/user";

/**
 * Model
 */
import Model from "./cashout.wallet.model";
import { IWallet } from "@/schema/wallet";

export class CashOutWalletController extends TransactionController {
  constructor() {
    super(Model);
  }

  public cashOut = async (
    peyyaUserId: string,
    { amount, concept }: { amount: number; concept: string }
  ) => {
    try {
      // Get user
      const { wallets } = (await this.getUser(peyyaUserId)) as IUser;

      return { message: "Not implemented yet", wallets };
    } catch (error) {
      throw error;
    }
  };
}
