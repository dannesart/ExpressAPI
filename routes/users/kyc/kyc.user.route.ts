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
import Model from "./kyc.user.model";

/**
 * Controller
 */
import { KYCUserController } from "./kyc.user.controller";
const controller = new KYCUserController();

/**
 * Endpoints for user. Create, update, get, delete etc.
 */
const router = express.Router();
const paymentService = new PaymentService(
  process.env.APP_USE_MOCK
).GetPaymentService();

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

router.post(
  Model.path,
  controller.verifyUser,
  controller.getUserMiddleWare,
  controller.init
);

export default router;
export { Model };
