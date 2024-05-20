/**
 * Dependencies
 */
import express from "express";

/**
 * Get user model.
 * Used for swagger.
 */
import Model from "./list.holds.model";

/**
 * Vendors
 */
import { ErrorStatuses } from "@/vendor/errors";

/**
 * Controller
 */
import { ListHoldsController } from "./list.holds.controller";
const controller = new ListHoldsController();

/**
 * Endpoints for transaction GET
 */
const router = express.Router();

// Get all current holds
router.get(Model.path, controller.verifyUser, async (req, res) => {
  try {
    const holdsResponse = await controller.getHolds(req.params.peyyaUserId);

    res.statusCode = 200;
    res.send(holdsResponse);
  } catch (error) {
    res.statusCode = Model.responses[ErrorStatuses.expectationFailed].status;
    res.send(Model.responses[ErrorStatuses.expectationFailed]);
  }
});

export default router;
