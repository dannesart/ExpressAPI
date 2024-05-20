/**
 * Dependencies
 */
import express from "express";

/**
 * Get user model.
 * Used for swagger.
 */
import Model from "./get.user.model";

/**
 * Get user controller.
 *
 */
import { GetUserController } from "./get.user.controller";
const controller = new GetUserController();

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

router.get(Model.path, controller.verifyUser, controller.init);

export default router;
export { Model };
