/**
 * Controller
 */
import { UserController } from "@/controllers/user.controller";

/**
 * Services
 */
import { PaymentService } from "@/services/payment/payment.service";

/**
 * Schemas
 */
import { ErrorStatuses, UserErrorCodes } from "@/vendor/errors";

/**
 * Model
 */
import Model from "./kyc.user.model";

const paymentService = new PaymentService(
  false //process.env.APP_USE_MOCK
).GetPaymentService();

export class KYCUserController extends UserController {
  constructor() {
    super(Model);
  }

  public init = async (req, res, next) => {
    const { peyyaUser } = req;
    const { firstName, lastName } = req.body;

    /**
     * Step 1
     * If user is verified. Create an object with default values.
     * And with passed in object.
     */

    /**
     * Step 3
     * Patch user object in DB with new object @userObjectToBeCreated
     * if error @return error 417
     */
    try {
      await this.updateUser({
        id: peyyaUser._id || peyyaUser.id,
        firstName,
        lastName,
        status: 1,
      });
      res.send({
        status: 200,
        message: "User was successfuly updated",
      });
    } catch (error) {
      res.statusCode = ErrorStatuses.expectationFailed;
      return res.send({
        status: ErrorStatuses.expectationFailed,
        error: error.message,
        errorCode: UserErrorCodes.userNotUpdated,
      });
    }
  };
}
