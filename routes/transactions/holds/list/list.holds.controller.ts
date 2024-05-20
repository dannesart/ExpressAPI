/**
 * Controller
 */
import { TransactionController } from "@/controllers/transaction.controller";

// Schemas
import { IUser, PeyyaUserId } from "@/schema/user";

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
import Model from "./list.holds.model";

export class ListHoldsController extends TransactionController {
  constructor() {
    super(Model);
  }

  /**
   * Retrieve entire hold list based on walletId
   * @param PeyyaUserId
   */

  public getHolds = async (peyyaUserId: PeyyaUserId) => {
    try {
      // Clean it up before sending it back
      return {
        message: "Not implemented yet",
      };
    } catch (error) {
      throw error;
    }
  };
}
