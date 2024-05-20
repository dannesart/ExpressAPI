/**
 * Controller
 */
import { DeveloperController } from "@/controllers/developer.controller";
import { authUserByPhone, createUser } from "@/services/auth";
import { Utils } from "@/utils";
import { ErrorStatuses } from "@/vendor/errors";

/**
 * Model
 */
import Model from "./phone.auth.model";

export class PhoneAuthController extends DeveloperController {
  constructor() {
    super(Model);
  }

  public init = async (req, res, next) => {
    // Authorize against bankid
    const phoneNumber = req.body.phoneNumber || req.headers.phoneNumber;
    const client_id = req.headers.clientid;

    const phoneNumberString =
      typeof phoneNumber === "string" ? phoneNumber : phoneNumber + "";

    try {
      const isCorrectFormatted = Utils.VerifyPhoneNumber(phoneNumberString);
      if (!isCorrectFormatted) {
        throw new Error("Phone number is not correct formatted");
      }

      const response = await this.startAuth(phoneNumberString, client_id);

      // if not exists from response Create new user.
      res.statusCode = 200;
      res.send(response);
    } catch (error) {
      if (error.message.indexOf(ErrorStatuses.badRequest) > -1) {
        res.statusCode = ErrorStatuses.badRequest;
        res.send(Model.responses[ErrorStatuses.badRequest]);
      } else {
        res.statusCode = ErrorStatuses.badRequest;
        res.send({
          ...Model.responses[ErrorStatuses.badRequest],
          error: error.message,
        });
      }
    }
  };

  private startAuth = async (phoneNumber: string, client_id: string) => {
    // Authorize against bankid

    try {
      const response = await authUserByPhone(phoneNumber, client_id);
      return response;
    } catch (error) {
      throw error;
    }
  };
}
