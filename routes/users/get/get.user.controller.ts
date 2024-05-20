/**
 * Services
 */
import { verifyUserId } from "@/services/auth";

/**
 * Controllers
 */
import { UserController } from "@/controllers/user.controller";

/**
 * Vendor
 */

import { ErrorStatuses } from "@/vendor/errors";

/**
 * Model
 */

import Model from "./get.user.model";
import { IUser } from "@/schema/user";

export class GetUserController extends UserController {
  constructor() {
    super(Model);
  }

  /**
   * Verify peyyaUserId
   * @param authToken (auth token)
   * @param peyyaUserId (string)
   *
   * TODO: Check if this can be part of verify user.
   */

  public verifyUserId = async (peyyaUserId: string, authToken: string) => {
    await verifyUserId(peyyaUserId, authToken).catch(() => {
      const errorModel = Model.responses[ErrorStatuses.unauthorized];
      throw new Error(errorModel.error);
    });
  };

  /**
   * Init of the route
   */
  public init = async (req, res, next) => {
    /**
     * @param phoneNumber
     */
    let phoneNumber =
      req.query.phoneNumber ||
      req.param.phoneNumber ||
      req.user["https://peyya.io/phone"];
    phoneNumber = phoneNumber.replace(/ /g, "");
    phoneNumber = phoneNumber.startsWith("+") ? phoneNumber : "+" + phoneNumber;

    /**
     * Step 1
     * If success, @return user
     */
    try {
      const user: IUser = await this.getUserByPhone(phoneNumber);
      res.send(user);
    } catch (error) {
      res.statusCode = ErrorStatuses.notFound;
      const errorModel = Model.responses[ErrorStatuses.notFound];
      res.send(errorModel);
    }
  };
}
