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

import Model from "./list.user.model";

export class ListUserController extends UserController {
  constructor() {
    super(Model);
  }

  /**
   * @param authToken (auth token)
   *
   * TODO: Check if this can be part of verify user.
   */

  public verifyUserId = async (peyyaUserId: string, authToken: string) => {
    await verifyUserId(peyyaUserId, authToken).catch(() => {
      const errorModel = Model.responses[ErrorStatuses.unauthorized];
      throw new Error(errorModel.error);
    });
  };
}
