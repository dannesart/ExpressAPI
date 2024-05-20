/**
 * Controller
 */
import { UserController } from "@/controllers/user.controller";

/**
 * Services
 */
import { PaymentServiceUser } from "@/services/payment/payment.service";

/**
 * Model
 */
import Model from "./kycurl.user.model";

const paymentUserService = new PaymentServiceUser(
  false //process.env.APP_USE_MOCK
).GetPaymentUserService();

export class KYCUrlUserController extends UserController {
  constructor() {
    super(Model);
  }

  public init = async (req, res, next) => {
    const { APP_URL } = process.env;
    const response = await paymentUserService.GetKYCUrl(
      APP_URL || "https://api.peyya.io"
    );
    res.send({ url: response });
  };
}
