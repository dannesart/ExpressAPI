import { Areas } from "@/schema/role/areas";
/**
 * Dependencies
 */
import express from "express";

/**
 * Vendor
 */
import { ErrorStatuses } from "@/vendor/errors";

/**
 * Schemas
 */
import { IUser } from "@/schema/user";

/**
 * Get user model.
 * Used for swagger.
 */
import Model from "./list.user.model";

/**
 * Get user controller.
 *
 */
import { ListUserController } from "./list.user.controller";
const controller = new ListUserController();

/**
 * Endpoints for user. Create, update, get, delete etc.
 */
const router = express.Router();

/**
 * GET User
 * @header authorization token
 *
 * @response error 401
 * Could not verify user. Perhaps token is invalid or user is not signed in.
 *
 * @response error 500
 * Other error
 *
 * @response success 200
 * Returns success if user is signed in.
 */

router.get(Model.path, controller.verifyUser, async (req, res) => {
  /**
   * Step 1
   * If success, @return user
   */
  try {
    const phone = req.query.phone as string;
    const users: IUser[] = await controller.getAllUsers(phone);
    res.send(users);
  } catch (error) {
    res.statusCode = ErrorStatuses.notFound;
    const errorModel = Model.responses[ErrorStatuses.notFound];
    res.send(errorModel);
    throw new Error(errorModel.error);
  }
});

export default router;
export { Model };
