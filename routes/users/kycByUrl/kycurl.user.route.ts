/**
 * Dependencies
 */
import express from "express";
/**
 * Services
 */

import { PaymentService } from "@/services/payment/payment.service";

/**
 * Schemas
 */
import { IUser } from "@/schema/user";

/**
 * Vendor
 */
import {
  ErrorStatuses,
  UserErrorMessages,
  UserErrorCodes,
} from "@/vendor/errors";
import { UserMessages } from "@/vendor/messages";

/**
 * Model
 */
import Model from "./kycurl.user.model";

/**
 * Controller
 */
import { KYCUrlUserController } from "./kycurl.user.controller";
const controller = new KYCUrlUserController();

/**
 * Endpoints for user. Create, update, get, delete etc.
 */
const router = express.Router();

/**
 * PATCH user
 * @param authorization token
 * @param peyyaUserId
 *
 * @response error 401
 * Could not verify user. Perhaps token is invalid or user is not signed in.
 *
 *
 */

router.get(
  Model.path,
  controller.verifyUser,
  controller.getUserMiddleWare,
  controller.init
);

export default router;
export { Model };
