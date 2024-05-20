/**
 * Dependencies
 */
import express from "express";

/**
 * Vendor
 */
import { ErrorStatuses } from "@/vendor/errors";

/**
 * Get user model.
 * Used for swagger.
 */
import Model from "./delete.user.model";

/**
 * Delete user controller.
 *
 */
import { DeleteUserController } from "./delete.user.controller";
const controller = new DeleteUserController();

/**
 * Endpoints for user. Create, update, get, delete etc.
 */
const router = express.Router();

/**
 * GET User
 * @header authorization token
 * @param peyyaUserId
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

router.delete(
  Model.path,
  controller.verifyUser,
  controller.canDelete,
  async (req, res) => {
    /**
     * @param peyyaUserId
     */
    const peyyaUserId = req.params.peyyaUserId;

    /**
     * Step 1
     * If success, @return user
     */
    try {
      await controller.delete(peyyaUserId);
    } catch (error) {
      res.statusCode = ErrorStatuses.notFound;
      const errorModel = Model.responses[ErrorStatuses.notFound];
      res.send(errorModel);
      throw new Error(errorModel.error);
    }
  }
);

export default router;
export { Model };
