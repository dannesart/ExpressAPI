/**
 * Dependencies
 */
import express from "express";

/**
 * Get holds model.
 * Used for swagger.
 */
import Model from "./post.holds.model";

/**
 * Controller
 */
import { PostHoldsController } from "./post.holds.controller";
const controller = new PostHoldsController();

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
    const holdResponse = await controller.createHold(req.params.peyyaUserId, {
      expiration: req.body.expirationDate,
      targetPeyyaUserId: req.body.targetPeyya,
      amount: req.body.amount,
      concept: req.body.concept,
    });

    res.statusCode = 200;
    res.send({
      status: 200,
      message: "Hold created",
      hold: holdResponse,
    });
  } catch (error) {
    res.statusCode = Model.responses[ErrorStatuses.expectationFailed].status;
    res.send(Model.responses[ErrorStatuses.expectationFailed]);
  }
});

export default router;
