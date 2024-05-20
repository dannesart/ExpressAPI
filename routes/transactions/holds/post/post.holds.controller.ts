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
import Model from "./post.holds.model";

export class PostHoldsController extends TransactionController {
  constructor() {
    super(Model);
  }

  public createHold = async (
    peyyaUserId: string,
    data: {
      amount: number;
      targetPeyyaUserId: string;
      expiration: string;
      concept: string;
    }
  ) => {
    try {
      // From user. Get by peyya user.
      // We need paymentUserId to transfer from one wallet to another.
      const fromUser: IUser = await this.getUser(peyyaUserId);

      // To user. Get by peyya user.
      // We need paymentUserId to transfer from one wallet to another.
      const toUser: IUser = await this.getUser(data.targetPeyyaUserId);

      // TODO: Implement this

      return {
        message: "Not implemented yet",
      };
    } catch (error) {
      throw error;
    }
  };
}
