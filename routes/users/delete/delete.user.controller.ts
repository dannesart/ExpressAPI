/**
 * Services
 */
import { verifyUserId } from "@/services/auth";

/**
 * Schemas
 */
import { Areas } from "@/schema/role/areas";

/**
 * Controllers
 */
import { UserController } from "@/controllers/user.controller";
import { RoleController } from "@/controllers/role.controller";

/**
 * Vendor
 */

import { ErrorStatuses } from "@/vendor/errors";

/**
 * Model
 */

import Model from "./delete.user.model";

const roleController = new RoleController(Areas.users, Model.method);

export class DeleteUserController extends UserController {
  constructor() {
    super(Model);
  }

  /**
   * Verify peyyaUserId
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

  public canDelete = async (req, res, next) => {
    try {
      const peyyaUserId = req.params.peyyaUserId;
      const auth = req.headers.authorization;
      if (this.verifyUserId(peyyaUserId, auth)) {
        return next();
      }
      await roleController.verifyUserRole(req, res, next);
    } catch (error) {
      throw error;
    }
  };

  public delete = async (peyyaUserId: string) => {
    try {
      await this.deleteUser(peyyaUserId);
    } catch (error) {
      throw error;
    }
  };
}
