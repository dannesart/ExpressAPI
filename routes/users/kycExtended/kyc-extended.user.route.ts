/**
 * Dependencies
 */
import express from "express";

/**
 * Schemas
 */
import { IUser } from "@/schema/user";

/**
 * Model
 */
import Model from "./kyc-extended.user.model";

/**
 * Vendor
 */
import { ErrorStatuses } from "@/vendor/errors";

/**
 * Controller
 */
import {
  KYCExtendedUserController,
  KYCInformation,
} from "./kyc-extended.user.controller";
const controller = new KYCExtendedUserController();

/**
 * Endpoints for user. Create, update, get, delete etc.
 */
const router = express.Router();

/**
 * POST verify user
 * @headers authorization token
 *
 * @param peyyaUserId
 *
 * @response error 401
 * User is unauthorized
 *
 *
 */

router.post(Model.path, controller.verifyUser, async (req, res) => {
  /**
   * @headers nad @params
   */
  const peyyaUserId = req.params.peyyaUserId;

  const information = req.body;

  /**
   * Do validate KYC request.
   * @param peyyaUserId
   */

  await controller.kyc(peyyaUserId, information).catch((error) => {
    res.statusCode = ErrorStatuses.expectationFailed;
    const errorModel = Model.responses[ErrorStatuses.expectationFailed];
    return res.send(errorModel);
  });

  /**
   * If success. Return success object.
   */
  res.send(Model.responses[200]);
});

export default router;
export { Model };
