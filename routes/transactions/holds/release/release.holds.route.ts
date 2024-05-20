/**
 * Dependencies
 */
import express from "express";

/**
 * Get holds model.
 * Used for swagger.
 */
import Model from "./release.holds.model";

/**
 * Controller
 */
import { ReleaseHoldsController } from "./release.holds.controller";
const controller = new ReleaseHoldsController();

/**
 * Vendor
 */
import { ErrorStatuses } from "@/vendor/errors";

/**
 * Endpoints for hold POST
 */
const router = express.Router();

// Create a hold.
router.post(Model.path, controller.verifyUser, async (req, res) => {
  try {
    const holdResponse = await controller.releaseHold(
      req.params.peyyaUserId,
      req.body.holdId
    );

    res.statusCode = 200;
    res.send({
      status: 200,
      message: "Hold released",
      transfer: holdResponse,
    });
  } catch (error) {
    res.statusCode = Model.responses[ErrorStatuses.expectationFailed].status;
    res.send(Model.responses[ErrorStatuses.expectationFailed]);
  }
});

export default router;
