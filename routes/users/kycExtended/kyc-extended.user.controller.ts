/**
 * Services
 */

import { PaymentService } from "@/services/payment/payment.service";
const paymentService = new PaymentService(
  process.env.APP_USE_MOCK
).GetPaymentService();

/**
 * Controller
 */

import { UserController } from "@/controllers/user.controller";

/**
 * KYC Schema
 * TODO: Move this.
 */
export interface KYCInformation {
  nationality: string;
  identityType: string;
  identityNumber: string;
  birthDate?: string;
  issueDate?: string;
  expiryDate?: string;
}

/**
 * Model
 */
import Model from "./kyc-extended.user.model";
import { ErrorStatuses } from "@/vendor/errors";

export class KYCExtendedUserController extends UserController {
  constructor() {
    super(Model);
  }

  /**
   * Verify KYC level 1.
   * In test env, this will simulate kyc 1.
   * In prod. Much more information is needed.
   * @param peyyaUserId (string)
   *
   */

  public kyc = async (peyyaUserId: string, kyc: KYCInformation) => {
    if (process.env.APP_STATE_TEST) {
      try {
        const user = await this.getUser(peyyaUserId);

        // TODO: Make this available.
        // const identity = await paymentService.SetKYCInformation(
        //   user.paymentUserId,
        //   kyc
        // );
        // TODO: Remove this for prod or move it.

        return { message: "Not implemented yet" };
      } catch (error) {
        throw error;
      }
    } else if (process.env.APP_STATE_PROD) {
      // Implement prod version of KYC 1.
    }
  };
}
