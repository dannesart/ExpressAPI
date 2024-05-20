/**
 * Controller
 */
import { TransactionController } from "@/controllers/transaction.controller";

/**
 * Schemas
 */

import { IUser } from "@/schema/user";

/**
 * Services
 */
import { PaymentService } from "@/services/payment/payment.service";
const paymentService = new PaymentService(
  process.env.APP_USE_MOCK
).GetPaymentService();

/**
 * Model
 */
import Model from "./release.holds.model";

export class ReleaseHoldsController extends TransactionController {
  constructor() {
    super(Model);
  }

  public releaseHold = async (peyyaUserId: string, holdId: string) => {
    try {
      // From user. Get by peyya user.
      // We need paymentUserId to transfer from one wallet to another.
      const User: IUser = await this.getUser(peyyaUserId);

      //TODO: Implement this

      return true;
    } catch (error) {
      throw new Error(error);
    }
  };
}
